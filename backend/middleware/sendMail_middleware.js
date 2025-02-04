import nodemailer from 'nodemailer';
import { SECRET_MAIL } from '../config/env_config';

const transport = () => nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: SECRET_MAIL
    }
})