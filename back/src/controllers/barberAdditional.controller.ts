import { NextFunction, Request, Response } from 'express';

import BarberAdditional from '../models/barberAdditional.js';
import ApiError from '../errors/api.error.js';

export const barberAdditionalController = {
    createBarberAdditional: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const newBarberAdditional = await BarberAdditional.create(req.body);
            res.json(newBarberAdditional).status(201);
        } catch (e) {
            next(new ApiError('Error creating', 400));
        }
    },
    getAdditionalForBooking: async (req: Request, res: Response, next: NextFunction) => {
        const { serviceId, barberId } = req.query;
        const byServiceBarber = await BarberAdditional.find({ barberId, services: serviceId })
            .select(['barber', 'additional', 'price', 'duration'])
            .populate({
                path: 'barber',
                select: 'name',
                strictPopulate: false
            })
            .populate({
                path: 'additional',
                select: ['name'],
                strictPopulate: false
            });
        res.json(byServiceBarber);

    }
};