import { NextFunction, Request, Response } from 'express';
import ApiError from '../errors/api.error.js';
import Customer from '../models/customer.js';

export const customerController = {
    searchCustomers: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { q } = req.query;
            if (q) {
                const customers = await Customer.find({
                    $or: [
                        { name: { $regex: '.*' + q + '.*', $options: 'i' } },
                        { phone: { $regex: '.*' + q + '.*', $options: 'i' } },
                    ],
                });
                res.json(customers).status(200);
            }
        } catch (e) {
            next(new ApiError('Error search', 500));
        }
    }
};