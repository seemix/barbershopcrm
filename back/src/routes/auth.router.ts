import { Router } from 'express';
import { body } from 'express-validator';

import authController from '../controllers/auth.controller.js';

const authRouter = Router();
authRouter.post('/register',
    body('email').isEmail(), body('password').isLength({ min: 3, max: 12 }),
    authController.register);
authRouter.post('/login', authController.login);
authRouter.post('/logout', authController.logout);
authRouter.get('/refresh', authController.refresh);

export default authRouter;
