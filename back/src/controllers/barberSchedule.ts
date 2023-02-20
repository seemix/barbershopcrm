import { NextFunction, Request, Response } from 'express';
import Schedule from '../models/barberSchedule.js';
import ApiError from '../errors/api.error.js';

export const barberScheduleController = {
    createBarberScheduler: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const newSchedule = await Schedule.create(req.body);
            res.json(newSchedule).status(200);
        } catch (e) {
            next(new ApiError('Error creating schedule', 500));
        }
    },
    getScheduleByBarber: async (req: Request, res: Response, next: NextFunction) => {
        try {
           const schedule =  await Schedule.find({ barber: req.params.barberId });
            res.json(schedule);
        } catch (e) {
            next(new ApiError('Error getting schedule', 500));
        }
    }
};
