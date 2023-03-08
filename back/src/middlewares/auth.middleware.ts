import { NextFunction, Request, Response } from 'express';

import ApiError from '../errors/api.error.js';
import { tokenService } from '../services/token.service.js';
import { IUserPayload } from '../interfaces/user-payload.js';

export const authMiddleware = (roles: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization?.split(' ')[1];
            const userData = await tokenService.validateAccessToken(token as string);
            const { role } = userData as IUserPayload;
            if (!token || !userData) next(new ApiError('Unauthorized', 401));
            if(roles && !roles.includes(role as string)) next(new ApiError('Forbidden', 403));
            next();
        } catch (e) {
            next(e);
        }
    };
};