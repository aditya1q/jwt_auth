import mongoose from 'mongoose';

const uesrAuthSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email must be unique"],
        trim: true, //some user put spaces before and after email that's why we are using the trim here
        minLength: [5, "Email must have 5 char"],
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, "password is required"],
        trim: true,
        select: false
    },
    // username: {
    //     type: String,
    //     required: [true, "Username is required"],
    //     trim: true,
    //     select: false,
    //     unique: [true, "Username must be unique"],
    // },
    verified: {
        type: Boolean,
        default: false
    },
    verificationCodeValidation: {
        type: Number,
        select: false,
    },
    verificationCode: {
        type: String,
        select: false
    },
    forgotPasswordCode: {
        type: String,
        select: false,
    },
    forgotPasswordCodeValidation: {
        type: Number,
        select: false
    }
}, { timestamps: true })

const User = mongoose.model('User', uesrAuthSchema);

export default User;