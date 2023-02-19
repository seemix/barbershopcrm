import { Request, Response, NextFunction } from 'express';

import Order from '../models/order.js';
import ApiError from '../errors/api.error.js';

export const orderController = {
    createOrder: async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.json(await Order.create(req.body))
        }catch (e) {
            next(new ApiError('Error creating order', 500));
        }
    }
};