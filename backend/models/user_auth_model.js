import mongoose from 'mongoose';

const uesrAuthSchema = mongoose.Schema({
    email: { type: String, required: [true, "Email is required"], unique: true },
    password: { type: String, required: [true, "password is required"] },
    username: { type: String, required: [true, "Username is required"] }
})

const user_auth = mongoose.model('user_auth', uesrAuthSchema);

export default user_auth;