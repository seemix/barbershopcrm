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
            res.status(201)
                .json(userData);
        } catch (e) {
            next(e);
        }
    },
    login: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password } = req.body;
            const userData = await userService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 3600000,
                httpOnly: true,
                sameSite: true
            })
                .status(201)
                .json(userData);
        } catch (e) {
            next(e);
        }
    },
    logout: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { refreshToken } = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            res.json(token);

        } catch (e) {
            next(new ApiError('Error while logout', 500));
        }
    },
    refresh: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { refreshToken } = req.cookies;
            const userData = await userService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                sameSite: true
            });
            return res.json(userData);
        } catch (e) {
            //next(new ApiError('Error refresh', 500));
            next(e);
        }
    }
};

export default authController;