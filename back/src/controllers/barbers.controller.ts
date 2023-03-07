import { Request, Response, NextFunction } from 'express';
import Barber from '../models/barber.js';
import ApiError from '../errors/api.error.js';

export const barbersController = {
    getAllBarbers: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { active } = req.query;
            const allBarbers = await Barber.find()
                .select('name')
                .select('description')
                .select('picture')
                .select('rating')
                .select('isActive')
                .sort({ order: 'asc' });
            res.json(allBarbers).status(200);
        } catch (e) {
            next(new ApiError('Error getting barbers', 400));
        }

    },
    createBarber: async (req: Request, res: Response, next: NextFunction) => {
        try {
            await Barber.create(req.body);
            res.status(201).json('ok');
        } catch (e) {
            next(new ApiError('Error creating barber', 400));
        }
    }
};

