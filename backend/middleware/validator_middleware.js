import Joi from "joi";

export const signupValidator = Joi.object({
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
