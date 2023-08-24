import { NextFunction, Request, Response } from 'express';
import Schedule from '../models/schedule.model.js';
import ApiError from '../errors/api.error.js';
import moment from 'moment';

export const barberScheduleController = {
    getAllSchedules: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const allSchedules = await Schedule.find();
            res.json(allSchedules);
        } catch (e) {
            next(new ApiError('Error retrieving data', 500));
        }
    },
    createBarberScheduler: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { data } = req.body;
            let arr = [];
            for (let i = 0; i < data.count; i++) {
                arr.push({
                    startTime: moment(data.start).add(i, 'days'),
                    endTime: moment(data.end).add(i, 'days'),
                    barber: data.barber,
                });
            }
            const responseArray = [];
            for (const arrElement of arr) {
                const res = await Schedule.create(arrElement);
                responseArray.push(res);
            }
            res.json(responseArray).status(201);
        } catch (e) {
            next(new ApiError('Error creating schedule', 500));
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
    },
    updateSchedule: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { data } = req.body;
            await Schedule.updateOne({ _id: data.id }, {
                startTime: String(new Date(data.start)),
                endTime: String(new Date(data.end)),
                barber: data.barber
            });
            const updatedSchedule  = await Schedule.findById({_id: data.id});
            res.json(updatedSchedule).status(200);
        } catch (e) {
            next(new ApiError('Error during update element', 500));
        }
    },
    deleteSchedule: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            await Schedule.deleteOne({ _id: id });
            res.json(id).status(200);
        } catch (e) {
            next(new ApiError('Error deleting item', 500));
        }
    }
};
