import User from "../models/user_auth_model.js";
import { signinSchema, signupSchema } from "../middleware/validator_middleware.js";
import { doHash, doHashValidation } from "../utils/hashing.js";
import CustomError from "../utils/customError.js";
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from "../config/env_config.js";
/**
 * Controller to handle user signup.
 * Validates input, checks for existing users, hashes the password, and saves the new user.
 */


// user Sign Up function
export const userSignup = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        // Validate input presence
        if (!email || !password) {
            throw new CustomError("Email and password are required.", 400, false);
        }

        // Validate input format
        const { error } = signupSchema.validate({ email, password });
        if (error) {
            throw new CustomError(error.details[0].message, 400, false);
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new CustomError("User already exists.", 409, false);
        }

        // Hash the password
        const hashedPassword = await doHash(password, 12);

        // Create and save the new user
        const newUser = new User({
            email,
            password: hashedPassword,
        });
        const savedUser = await newUser.save();

        // Remove the password before sending the response
        savedUser.password = undefined;

        // Send a success response
        res.status(201).json({
            success: true,
            message: "Your account has been created successfully.",
            savedUser,
        });
    } catch (error) {
        // Pass any caught errors to the global error handler
        if (error instanceof CustomError) {
            return next(error); // Pass the CustomError to the global error handler
        }
        console.error("Error saving user:", error);
        next(new CustomError("Internal server error", 500, false)); // Default to internal server error
    }
};


// user Sign In function
export const userSingin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const { error } = signinSchema.validator({ email, password });
        if (error) {
            throw new CustomError(error.details[0].message, 400, false)
        }

        const existingUser = await User.findOne({ email }).select('+paasword')
        if (!existingUser) {
            throw new CustomError("User does not exists!", false, 401);
        }
        const result = doHashValidation(password, existingUser.password);
        if (!result) {
            throw new CustomError("Invalid credentials!", false, 401);
        }
        const token = jwt.sign({
            userId: existingUser._id,
            email: existingUser.email,
            verified: existingUser.verified
        }, TOKEN_SECRET)

        res.cookie('Authorization', 'Bearer', +token, {
            expires: new Date(Date.now() + 8 * 3600000),
            httpOnly: process.env.NODE_ENV === 'production',
            success: true,
            token,
            message: 'loggedIn successfully'
        })
    }
    catch (error) {
        if (error instanceof CustomError) return next(error)
    }

    console.log("Error SignIn user", error);
    next(new CustomError("Internal server error", 500, false))  // Default to internal server error
};