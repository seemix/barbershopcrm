import { Request, Response, NextFunction } from 'express';

import Order from '../models/order.js';
import { freeSlots } from '../services/generateFreeSlots.js';
import ApiError from '../errors/api.error.js';

export const orderController = {
    createOrder: async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.json(await Order.create(req.body));
        } catch (e) {
            next(new ApiError('Error creating order', 500));
        }
    },
    generateSlots: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { barberId, duration = 1 } = req.query;
            if (!barberId || !duration) {
                next(new ApiError('Bad request params', 400));
            }
            const slots = await freeSlots(String(barberId), String(duration));
            res.json(slots).status(200);

        } catch (e) {
            next(new ApiError('Error getting free time slots', 400));
        }
    }
};