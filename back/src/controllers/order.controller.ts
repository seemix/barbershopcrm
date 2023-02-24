import { Request, Response, NextFunction } from 'express';

import Order from '../models/order.js';
import { freeSlots } from '../services/generateFreeSlots.js';
import ApiError from '../errors/api.error.js';
import Customer from '../models/customer.js';

export const orderController = {
    createOrder: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {
                customerName,
                customerPhone,
                customerEmail,
                barberId,
                serviceId,
                additionalServices,
                startTime,
                endTime
            } = req.body;
            let { customerId } = req.body;
            if (!customerId) {
                const newCustomer = await Customer.create({
                    name: customerName,
                    phone: customerPhone,
                    email: customerEmail
                });
                customerId = newCustomer._id;
            }
            const newOrder = await Order.create({
                barber: barberId,
                customer: customerId,
                service: serviceId,
                additional: additionalServices,
                startTime: startTime,
                endTime: endTime
            });
            res.json(newOrder);
        } catch (e) {
            next(new ApiError('Error creating order', 500));
        }
    },
    getOrderById: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { orderId } = req.params;
            const order = await Order.find({ _id: orderId })
                .select(['startTime', 'endTime'])
                .populate({
                    path: 'barber',
                    select: ['name'],
                    strictPopulate: false
                })
                .populate({
                    path: 'service',
                    select: ['name'],
                    strictPopulate: false,
                })
                .populate({
                    path: 'additional',
                    strictPopulate: false
                });
            res.json(order);
        } catch (e) {

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