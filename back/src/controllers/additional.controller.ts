import { Request, Response, NextFunction } from 'express';
import Additional from '../models/additional.js';
import ApiError from '../errors/api.error.js';

export const additionalController = {
    createAdditional: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const newAdditional = await Additional.create({ name: req.body.name, order: 0 });
            res.json(newAdditional).status(201);
        } catch (e) {
            next(new ApiError('Error creating new additional service', 400));
        }
    },
    getAllAdditional: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const allAdditional = await Additional.find().sort({ order: 1 });
            res.json(allAdditional).status(200);
        } catch (e) {
            next(new ApiError('Error getting additional service', 400));
        }
    },
    deleteAdditional: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const deleted = await Additional.deleteOne({ _id: id });
            res.json(deleted).status(204);
        } catch (e) {
            next(new ApiError('Error deleting item', 500));
        }
    },
    updateAdditional: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const updated = await Additional.updateOne({ _id: req.params.id }, {
                name: req.body.name,
            });
            res.json(updated).status(200);
        } catch (e) {
            next(new ApiError('Error updating item', 500));
        }
    },
    updateAdditionalOrder: async (req: Request, res: Response, next: NextFunction) => {
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
            const upd = await Additional.bulkWrite(bulk);
            res.json(upd).status(200);
        } catch (e) {
            next(new ApiError('Error reorder', 400));
        }
    },

};

export default additionalController;