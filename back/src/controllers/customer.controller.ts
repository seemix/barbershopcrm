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
        },
        getAllCustomers: async (req: Request, res: Response, next: NextFunction) => {
            try {
                // const pages = await Customer.find().count() / 3;
                const { page = 1, filter, sort, limit = 3 } = req.query;
                const customers = await Customer.find().skip((+page - 1) * 3).limit(+limit);
                res.json(customers).status(200);
            } catch (e) {
                next(e);
            }
        }
    }
;