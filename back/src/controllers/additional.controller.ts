import { Request, Response, NextFunction } from 'express';
import Additional from '../models/additional.js';
import ApiError from '../errors/api.error.js';

export const additionalController = {
    createAdditional: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const newAdditional = await Additional.create(req.body);
            res.json(newAdditional).status(201);
        } catch (e) {
            next(new ApiError('Error creating new additional service', 400));
        }
    },
    getAllAdditional: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const allAdditional = await Additional.find();
            res.json(allAdditional).status(200);
        } catch (e) {
            next(new ApiError('Error getting additional service', 400));
        }
    },

};