import { NextFunction, Request, Response } from 'express';
import ApiError from '../errors/api.error.js';
import Customer from '../models/customer.js';
import config from '../config.js';

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
            next(new ApiError('Error search', 400));
        }
    },
    getAllCustomers: async (req: Request, res: Response, next: NextFunction) => {
        try {
            // const pages = Math.ceil(await Customer.find().count() / config.CUSTOMERS_PER_PAGE);
            const { page = 1, search, limit = config.CUSTOMERS_PER_PAGE } = req.query;
            let searchObj = {};
            if (search) searchObj = {
                $or: [
                    { name: { $regex: '.*' + search + '.*', $options: 'i' } },
                    { phone: { $regex: '.*' + search + '.*', $options: 'i' } },
                    { email: { $regex: '.*' + search + '.*', $options: 'i' } },
                    { tag: { $regex: '.*' + search + '.*', $options: 'i' } },
                ],
            };
            const customers = await Customer.find(searchObj).skip((+page - 1) * config.CUSTOMERS_PER_PAGE).limit(+limit);
            const pages = Math.ceil(await Customer.find(searchObj).count() / config.CUSTOMERS_PER_PAGE);
            res.json({ pages, page: +page, customers }).status(200);
        } catch (e) {
            next(e);
        }
    },
    createCustomer: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const newCustomer = await Customer.create(req.body);
            res.json(newCustomer).status(201);
        } catch (e) {
            next(e);
        }
    },
    updateCustomer: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { _id } = req.params;
            const updatedCustomer = await Customer.findByIdAndUpdate({ _id }, req.body);
            res.json(updatedCustomer).status(200);
        } catch (e) {
            next(e);
        }
    },
    deleteCustomer: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { _id } = req.params;
            await Customer.deleteOne({ _id });
            res.json(_id).status(200);
        } catch (e) {
            next(e);
        }
    }
};