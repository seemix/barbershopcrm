import { NextFunction, Request, Response } from 'express';

import BarberService from '../models/barberService.js';
import { getPrices } from '../services/get-prices.js';

export const barberServiceController = {
    // getAllBarberServices: async (req: Request, res: Response, next: NextFunction) => {
    //     try {
    //         const allBarberServices = await BarberService.aggregate([
    //             {
    //                 $lookup: {
    //                     from: 'barbers',
    //                     localField: 'barber',
    //                     foreignField: '_id',
    //                     as: 'barber'
    //                 }
    //             },
    //             {
    //                 $lookup: {
    //                     from: 'services',
    //                     localField: 'service',
    //                     foreignField: '_id',
    //                     as: 'service'
    //                 }
    //             },
    //             {
    //                 $unwind: '$barber'
    //             },
    //             {
    //                 $unwind: '$service'
    //             },
    //             {
    //                 $group: {
    //                     _id: '$barber.name',
    //                     barberId: { $first: '$barber._id' },
    //                     services: {
    //                         $push: {
    //                             name: '$service.name',
    //                             price: '$price',
    //                             duration: '$duration',
    //                             _id: '$_id'
    //                         }
    //                     }
    //                 }
    //             },
    //             {
    //                 $project: {
    //                     barber: {
    //                         _id: '$barberId',
    //                         name: '$_id'
    //                     },
    //                     _id: 0,
    //                     services: 1
    //                 }
    //             },
    //             {
    //                 $sort: {
    //                     name: 1
    //                 }
    //             }
    //         ]);
    //         res.json(allBarberServices).status(200);
    //     } catch (e) {
    //         next(new ApiError('Error getting services', 400));
    //     }
    // },
    createBarberService: async (req: Request, res: Response, next: NextFunction) => {
        try {

            const newBarberService = await BarberService.create(req.body);
            const resNewBarberService = await BarberService.findById(newBarberService._id)
                .populate({
                    path: 'additionals',
                    strictPopulate: false,
                    select: 'additional',
                    populate: { path: 'additional' }
                })
                .populate({
                    path: 'service',
                    select: 'name',
                    strictPopulate: false
                });
            res.json(resNewBarberService);

        } catch (e) {
            next(e);
            // next(new ApiError('Error creating BarberService', 400));
        }
    },
    getBarberServicesByBarber: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { barber } = req.params;
            const byBarber = await BarberService.find({ barber: barber })
                .select(['service', 'price', 'duration', 'additionals'])
                .populate({
                    path: 'service',
                    select: ['name'],
                    strictPopulate: false
                })
                .populate({
                    path: 'additionals',
                    select: ['additional'],
                    populate: { path: 'additional' },
                    strictPopulate: false
                });
            res.json(byBarber).status(200);
        } catch (e) {
            next(e);
        }
    },
    updateBarberServiceAdditionals: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { barberService } = req.params;
            const updatedService = await BarberService.findByIdAndUpdate({ _id: barberService }, { additionals: req.body.additionals }, { returnOriginal: false });
            res.json(updatedService).status(200);
        } catch (e) {
            next(e);
        }
    },
    getAdminBarberServices: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await getPrices();

            // const { barber } = req.params;
            // const adminBarberServices = await BarberService.find({barber})
            //     .populate({path: 'service'})
            //     .populate({path: 'additionals', select: ['additional']});
            res.json(result);
        } catch (e) {
            next(e);
        }
    },

    updateBarberService: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { _id } = req.params;
            const { price, duration, additionals } = req.body;
            await BarberService.findByIdAndUpdate({ _id }, {
                $set: {
                    price,
                    duration,
                    additionals
                }
            });
            const updated = await BarberService.findById(_id).populate({
                path: 'additionals',
                strictPopulate: false,
                select: 'additional',
                populate: { path: 'additional' }
            });
            res.json(updated).status(200);
        } catch (e) {
            next(e);
        }
    },

    deleteBarberServiceById: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { _id } = req.params;
            await BarberService.findByIdAndDelete({_id});
            res.json(_id).status(200);
        } catch (e) {
            next(e);
        }
    }
};