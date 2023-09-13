import { Request, Response, NextFunction } from 'express';

import Order from '../models/order.js';
import { freeSlots } from '../services/generate-free-slots.service.js';
import ApiError from '../errors/api.error.js';
import Customer from '../models/customer.js';
import { sendMail } from '../services/send-email.service.js';
import { getOrdersForCalendar, getSingleCustomer, orderForEmailSend } from '../services/order-services.js';


export const orderController = {
    getOrders: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const orders = await getOrdersForCalendar();
            res.json(orders).status(200);

        } catch (e) {
            next(new ApiError('Error getting orders', 500));
        }
    },

    createOrder: async (req: Request, res: Response, next: NextFunction) => {
        try {
            let objToCreate = req.body;
            if (!objToCreate.customer) {
                const customer = await Customer.create({
                    name: req.body.customerName,
                    phone: req.body.customerPhone,
                    email: req.body.customerEmail
                });
                objToCreate = { ...objToCreate, customer };
            }
            const { _id } = await Order.create(objToCreate);
            const newOrder = await getSingleCustomer(_id);
            res.json(newOrder).status(201);
        } catch (e) {
            next(e);
        }
    },
    getOrderById: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { orderId } = req.params;
            const order: any = await orderForEmailSend(orderId);
            if (order) {
                //@ts-ignore
                const originalDate = new Date(order.startTime);
                const options = {
                    weekday: 'short', // "ddd"
                    day: '2-digit',   // "DD"
                    month: 'long',    // "MMMM"
                    hour: '2-digit',  // "HH"
                    minute: '2-digit' // "mm"
                };
                //@ts-ignore
                const formatter = new Intl.DateTimeFormat('ru-RU', options);
                const formattedDate = formatter.format(originalDate);

                await sendMail(order.customer.email, {
                    customerName: order.customer.name,
                    orderId: order._id,
                    startTime: formattedDate,
                    barberName: order.barber.name
                });
                res.json(order);
            }
        } catch (e) {
            next(new ApiError('Error getting order', 400));
        }
    },
    generateSlots: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { barberId, duration = 1 } = req.query;
            if (!barberId || !duration) {
                next(new ApiError('Bad request params', 400));
            }
            const slots = await freeSlots(String(barberId), String(duration));
            if (!slots) res.json([]).status(200);
            res.json(slots).status(200);

        } catch (e) {
            next(new ApiError('Error getting free time slots', 400));
        }
    },
    deleteOrderById: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            await Order.deleteOne({ _id: id });
            res.json(id).status(200);
        } catch (e) {
            next(new ApiError('Error deleting item', 500));
        }
    },
    updateOrderById: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            await Order.findByIdAndUpdate(id, req.body);
            const updatedItem = await getSingleCustomer(id);
            res.json(updatedItem).status(200);
        } catch (e) {
            next(e);
        }
    },
    updateOrderTime: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { _id, startTime, endTime } = req.body;
            await Order.findByIdAndUpdate({ _id, startTime, endTime });
            res.status(200).json({ _id, startTime, endTime });
        } catch (e) {
            next(new ApiError('Error updating time', 400));
        }
    }
};