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
            }).sort({ order: 1 });
            res.json(allServices).status(200);
        } catch (e) {
            next(new ApiError('Error getting services', 400));
        }

    },
    createService: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const newService = await Service.create({ name: req.body.name, description: req.body.description });
            res.status(201).json(newService);
        } catch (e) {
            next(new ApiError('Error creating service', 400));
        }
    },
    deleteService: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const deleted = await Service.deleteOne({ _id: id });
            res.json(deleted).status(203);
        } catch (e) {
            next(new ApiError('Error deleting item', 500));
        }
    },
    updateService: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const updated = await Service.updateOne({ _id: req.params.id }, {
                name: req.body.name,
                description: req.body.description
            });
            res.json(updated).status(200);
        } catch (e) {
            next(new ApiError('Error updating item', 500));
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
    },
    updateOrder: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const arr = req.body;
            for (let i = 0; i < arr.length; i++) {
                arr[i].order = i;
            }
            const bulk = arr.map((item: any) => ({
                updateOne: {
                    filter: { _id: item._id },
                    update: { order: item.order }
                }
            }));
            const upd = await Service.bulkWrite(bulk);
            res.json(upd).status(200);
        } catch (e) {
            next(new ApiError('Error reorder', 400));
        }
    }
};
export default servicesController;