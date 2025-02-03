import express from 'express';
import { userSignup, userSingin } from '../controllers/auth_controller.js';

const router = express.Router();

router.post('/sign-up', userSignup);
router.post('/sign-in', userSingin);

export default router;