import { Request, Response, NextFunction } from 'express';

import Service from '../models/service.js';
import ApiError from '../errors/api.error.js';

export const servicesController = {
    getAllServices: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const allServices = await Service.find().populate({
                path: 'additional',
                select: ['name'],
                strictPopulate: false
            });
            res.json(allServices).status(200);
        } catch (e) {
            next(new ApiError('Error getting services', 400));
        }

    },
    createService: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const newService = await Service.create(req.body);
            res.status(201).json(newService);
        } catch (e) {
            next(new ApiError('Error creating service', 400));
        }
    },
    addAdditionalToService: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { serviceId, additional } = req.body;
            const updatedService = await Service.findByIdAndUpdate({ _id: serviceId }, { additional });
            res.json(updatedService).status(200);
        } catch (e) {
            next(new ApiError('Error editing service', 400));
        }
    }
};
export default servicesController;