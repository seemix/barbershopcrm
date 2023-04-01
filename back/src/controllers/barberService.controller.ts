import { NextFunction, Request, Response } from 'express';

import BarberService from '../models/barberService.js';
import ApiError from '../errors/api.error.js';

export const barberServiceController = {
    getAllBarberServices: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const allBarberServices = await BarberService.aggregate([
                {
                    $lookup: {
                        from: 'barbers',
                        localField: 'barber',
                        foreignField: '_id',
                        as: 'barber'
                    }
                },
                {
                    $lookup: {
                        from: 'services',
                        localField: 'service',
                        foreignField: '_id',
                        as: 'service'
                    }
                },
                {
                    $unwind: '$barber'
                },
                {
                    $unwind: '$service'
                },
                {
                    $group: {
                        _id: '$barber.name',
                        barberId: { $first: '$barber._id' },
                        services: {
                            $push: {
                                name: '$service.name',
                                price: '$price',
                                _id: '$_id'
                            }
                        }
                    }
                },
                {
                    $project: {
                        barber: {
                            _id: '$barberId',
                            name: '$_id'
                        },
                        _id: 0,
                        services: 1
                    }
                },
                {
                    $sort: {
                        name: 1
                    }
                }
            ]);
            res.json(allBarberServices).status(200);
        } catch (e) {
            next(new ApiError('Error getting services', 400));
        }
    },
    createBarberService: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const newBarberService = await BarberService.create(req.body);
            res.json(newBarberService);

        } catch (e) {
            next(new ApiError('Error creating BarberService', 400));
        }
    },
    getBarberServicesByBarber: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { barber } = req.params;
            const byBarber = await BarberService.find({ barber: barber })
                .select(['service', 'price', 'duration'])
                .populate({
                    path: 'service',
                    select: ['name'],
                    strictPopulate: false
                });
            res.json(byBarber).status(200);
        } catch (e) {

        }
    }
};