import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

import ApiError from '../errors/api.error.js';
import { userService } from '../services/user.service.js';

export const authController = {
    register: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                next(new ApiError('Bad request', 400));
            }
            const { email, password } = req.body;
            const userData = await userService.register(email, password);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 3600000, httpOnly: true })
                .status(201)
                .json(userData);
        } catch (e) {
            next(e);
        }
    },
    login: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password } = req.body;
            const userData = await userService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 3600000, httpOnly: true })
                .status(201)
                .json(userData);
        } catch (e) {
            next(e);
        }
    },
    logout: async (req: Request, res: Response, next: NextFunction) => {
        try {

        } catch (e) {
            next(new ApiError('Error while logout', 500));
        }
    },
    refresh: async (req: Request, res: Response, next: NextFunction) => {
        try {

        } catch (e) {
            next(new ApiError('Error refresh', 500));
        }
    }
};

export default authController;