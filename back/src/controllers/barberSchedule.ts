import { NextFunction, Request, Response } from 'express';
import Schedule from '../models/schedule.model.js';
import ApiError from '../errors/api.error.js';
import moment from 'moment';

export const barberScheduleController = {
    createBarberScheduler: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { data } = req.body;
            let arr = [];
            for (let i = 0; i < data.count; i++) {
                arr.push({
                    startTime: String(moment(data.start).add(i, 'days')),
                    endTime: String(moment(data.end).add(i, 'days')),
                    barber: data.barber,
                    title: ''
                });
            }
            await Schedule.insertMany(arr);
            const newRes = await Schedule.find({ barber: data.barber });
            res.json(newRes).status(200);
        } catch (e) {
            next(e);
            //  next(new ApiError('Error creating schedule', 500));
        }
    },
    getScheduleByBarber: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const schedule = await Schedule.find({ barber: req.params.barberId });
            const result = schedule.map(item => {
                return {
                    event_id: item._id,
                    start: item.startTime,
                    end: item.endTime
                };
            });

            res.json(result);

        } catch (e) {
            next(new ApiError('Error getting schedule', 500));
        }
    }
};
