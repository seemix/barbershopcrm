import { NextFunction, Request, Response } from 'express';
import Schedule from '../models/schedule.model.js';
import ApiError from '../errors/api.error.js';

export const barberScheduleController = {
    createBarberScheduler: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { data } = req.body;
            const { schedule } = data;
            const params = {
                startTime: schedule[0].start,
                endTime: schedule[0].end,
                barber: schedule[0].barber
            }
           // console.log(params);
            const newSchedule = await Schedule.create(params);
            console.log(newSchedule);
            res.json(newSchedule).status(201);
        } catch (e) {
            //next(e);
            next(new ApiError('Error creating schedule', 500));
        }
    },
    getScheduleByBarber: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const schedule = await Schedule.find({ barber: req.params.barberId });
            const result = schedule.map(item => {
                return {
                    event_id: item._id,
                 //   title: '',
                    start: item.startTime,
                    end: item.endTime
                };
            });

          //  res.json(result);
            const arr = [
                {
                    event_id: 1,
                    title: "Event 1",
                    start: new Date(new Date(new Date().setHours(9)).setMinutes(0)),
                    end: new Date(new Date(new Date().setHours(10)).setMinutes(0)),
                    disabled: true,
                    admin_id: [1, 2, 3, 4]
                },
                {
                    event_id: 2,
                    title: "Event 2",
                    start: new Date(new Date(new Date().setHours(10)).setMinutes(0)),
                    end: new Date(new Date(new Date().setHours(12)).setMinutes(0)),
                    admin_id: 2,
                    color: "#50b500"
                },
                {
                    event_id: 3,
                    title: "Event 3",
                    start: new Date(new Date(new Date().setHours(11)).setMinutes(0)),
                    end: new Date(new Date(new Date().setHours(12)).setMinutes(0)),
                    admin_id: 1,
                    editable: false,
                    deletable: false
                },
                {
                    event_id: 4,
                    title: "Event 4",
                    start: new Date(
                        new Date(new Date(new Date().setHours(9)).setMinutes(30)).setDate(
                            new Date().getDate() - 2
                        )
                    ),
                    end: new Date(
                        new Date(new Date(new Date().setHours(11)).setMinutes(0)).setDate(
                            new Date().getDate() - 2
                        )
                    ),
                    admin_id: 2,
                    color: "#900000"
                },
                {
                    event_id: 5,
                    title: "Event 5",
                    start: new Date(
                        new Date(new Date(new Date().setHours(10)).setMinutes(30)).setDate(
                            new Date().getDate() - 2
                        )
                    ),
                    end: new Date(
                        new Date(new Date(new Date().setHours(14)).setMinutes(0)).setDate(
                            new Date().getDate() - 2
                        )
                    ),
                    admin_id: 2,
                    editable: true
                },
                {
                    event_id: 6,
                    title: "Event 6",
                    start: new Date(
                        new Date(new Date(new Date().setHours(10)).setMinutes(30)).setDate(
                            new Date().getDate() - 4
                        )
                    ),
                    end: new Date(new Date(new Date().setHours(14)).setMinutes(0)),
                    admin_id: 2
                }
            ];
            res.json(result);

        } catch (e) {
            next(new ApiError('Error getting schedule', 500));
        }
    }
};
