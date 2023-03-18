import { Request, Response, NextFunction } from 'express';

import Order from '../models/order.js';
import { freeSlots } from '../services/generate-free-slots.service.js';
import ApiError from '../errors/api.error.js';
import Customer from '../models/customer.js';
import { sendMail } from '../services/send-email.service.js';
import { IOrderRecord } from '../interfaces/order-record.js';
import barber from '../models/barber.js';

export const orderController = {
    createOrder: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {
                customerName,
                customerPhone,
                barberId,
                serviceId,
                additionalServices,
                startTime,
                endTime,
                price
            } = req.body;
            let { customerId, customerEmail } = req.body;
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
                endTime: endTime,
                price: price
            });
            res.json(newOrder);
        } catch (e) {
            next(new ApiError('Error creating order', 500));
        }
    },
    getOrderById: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { orderId } = req.params;
            const order: IOrderRecord | null = await Order.findOne({ _id: orderId })
                .select(['startTime', 'price'])
                .populate({
                    path: 'customer',
                    select: ['name', 'email'],
                    strictPopulate: false
                })
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
                    select: ['name'],
                    strictPopulate: false
                });
            if (order)
                await sendMail(order.customer.email, {
                    customerName: order.customer.name,
                    orderId: order._id,
                    startTime: order.startTime,
                    barberName: order.barber.name
                });

            res.json(order);
        } catch (e) {
            next(new ApiError('Error getting order', 500));
        }
    },
    generateSlots: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { barberId, duration = 1 } = req.query;
            if (!barberId || !duration) {
                next(new ApiError('Bad request params', 400));
            }
            const slots = await freeSlots(String(barberId), String(duration));
            if(!slots) res.json([]).status(200);
            res.json(slots).status(200);

        } catch (e) {
            next(new ApiError('Error getting free time slots', 400));
        }
    }
};