import Joi from "joi";

export const signupSchema = Joi.object({
    name: Joi.string()
        .min(4)
        .max(20)
        .trim()
        .required()
        .messages({
            'string.empty': 'Name is required',
            'string.min': 'Name must be at least 4 characters',
            'string.max': 'Name cannot exceed 20 characters'
        }),

    email: Joi.string()
        .min(6)
        .max(60)
        .trim()
        .required().
        email({
            tlds: { allow: ['com', 'net'] },
        })
        .messages({
            'string.empty': 'Email is required',
            'string.email': 'Invalid email format'
        }),

    password: Joi.string()
        .min(8)
        .max(32)
        .required()
        .messages({
            'string.empty': 'Password is required',
            'string.min': 'Password must be at least 8 characters',
            'string.max': 'Password cannot exceed 32 characters',
            'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
        })
})

export const signinSchema = Joi.object({
    email: Joi.string()
        .min(6)
        .max(60).
        required().
        email({
            tlds: { allow: ['com', 'net'] },
        }),
    password: Joi.string()
        .required()
    // .pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,}$/))
})
