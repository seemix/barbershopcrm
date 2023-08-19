import { Request, Response, NextFunction } from 'express';
import Barber from '../models/barber.js';
import ApiError from '../errors/api.error.js';

export const barbersController = {
    getAllBarbers: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const allBarbers = await Barber.find()
                .select(['name','description', 'picture', 'rating', 'isActive'])
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
            next(e);
        }
    },
    getBarberById: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const barber = await Barber.findById(req.params.barberId).select(['name','picture']);
            res.json(barber).status(200);
        } catch (e) {
          next(e);
        }
    }
};

