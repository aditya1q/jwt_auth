import express from 'express';
import { userSignup } from '../controllers/auth_controller.js';

const router = express.Router();

router.post('/sign-up', userSignup);

export default router;