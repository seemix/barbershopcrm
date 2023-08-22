import { NextFunction, Request, Response } from 'express';

import BarberAdditional from '../models/barberAdditional.js';
import ApiError from '../errors/api.error.js';
import BarberService from '../models/barberService.js';

export const barberAdditionalController = {
    createBarberAdditional: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const newBarberAdditional = await BarberAdditional.create(req.body);
            const response = await BarberAdditional.findById(newBarberAdditional._id).populate({
                path: 'additional',
                strictPopulate: false,
                select: 'name'
            });

            res.json(response).status(201);
        } catch (e) {
            next(new ApiError('Error creating', 400));
        }
    },
    getAdditionalForBooking: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { serviceId, barberId } = req.query;
            const byServiceBarber = await BarberAdditional.find({ barber: barberId, services: serviceId })
                .select(['barber', 'price', 'duration'])
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
        } catch (e) {
            next(e);
        }


    },
    getAdditionalByBarber: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { barberId } = req.params;
            const additionalServices = await BarberAdditional.find({ barber: barberId })
                .populate({ path: 'additional' });
            res.json(additionalServices).status(200);
        } catch (e) {
            next(e);
        }
    },
    getAdditionalsByBarberAndService: async (req: Request, res: Response, next: NextFunction) => {
        const { barberId, serviceId } = req.query;
        try {
            const result = await BarberService.findOne({ barber: barberId, service: serviceId })
                .select(['_id'])
                .populate({ path: 'additionals', select: ['price', 'duration'], populate: 'additional' });
            // .lean();

            //@ts-ignore
            const arranged = result.additionals.map(item => {
                return {
                    // @ts-ignore
                    _id: item.additional._id,
                    // @ts-ignore
                    name: item.additional.name,
                    // @ts-ignore
                    order: item.additional.order,
                    // @ts-ignore
                    price: item.price,
                    // @ts-ignore
                    duration: item.duration
                };

            });
            res.json(arranged);

        } catch (e) {
            next(e);
        }
    },

    updateBarberAdditional: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { _id, barber, additional, price, duration } = req.body;
            await BarberAdditional.updateOne({ _id }, { barber, price, duration, additional });
            res.json(req.body).status(200);
        } catch (e) {
            next(e);
        }
    },

    deleteBarberAdditionalById: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { _id } = req.params;
            await BarberService.updateMany(
                { additionals: _id },
                { $pull: { additionals: _id } });
            await BarberAdditional.deleteOne({ _id });
            res.json(_id).status(200);

        } catch (e) {
            next(e);
        }
    }

};