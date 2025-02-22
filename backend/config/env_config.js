import dotenv from 'dotenv';

dotenv.config();
export const PORT = process.env.PORT
export const MONGO_URI = process.env.MONGO_URL
export const TOKEN_SECRET = process.env.TOKEN_SECRET
export const SECRET_MAIL = process.env.NODE_CODE_SENDING_EMAIL_ADDRESS