import User from "../models/user_auth_model.js";
import { signupValidator } from "../middleware/validator_middleware.js";
import { doHash } from "../utils/hashing.js";
import CustomError from "../utils/customError.js";

/**
 * Controller to handle user signup.
 * Validates input, checks for existing users, hashes the password, and saves the new user.
 */

export const userSignup = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        // Validate input presence
        if (!email || !password) {
            throw new CustomError("Email and password are required.", 400, false);
        }

        // Validate input format
        const { error } = signupValidator.validate({ email, password });
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
