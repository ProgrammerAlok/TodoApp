import { Router } from 'express';
import { isLoggedIn } from '../middlewares/auth.middleware.js';
import { getUser, loginUser, logout, registerUser } from '../controllers/user.controller.js';

const router = Router();

router.route('/me').get(isLoggedIn, getUser);

router.route('/register').post(registerUser);

router.route('/login').post(loginUser);

router.route('/logout').get(logout);

export default router;