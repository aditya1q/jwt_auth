import mongoose from "mongoose";
import User from "./user_auth_model";

const userPostSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "title is required"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "description is required"],
        trim: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: [true, "userId is required"],
        trim: true
    },
}, { timestamps: true });

const UserPost = mongoose.model('Post', userPostSchema);
export default UserPost;