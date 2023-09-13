import Order from '../models/order.js';
import moment from 'moment';

export const getOrdersForCalendar = async () => {
    return Order.find({
        startTime: {
            $gte: moment(Date.now()).add(-3, 'week'),
            $lt: moment(Date.now()).add(1, 'week')
        }
    })
        .populate({
            path: 'customer',
            select: ['name', 'phone'],
        })
        .populate({
            path: 'service',
            select: 'name',
        })
        .populate({
            path: 'additional',
            select: 'name',
            strictPopulate: false
        });
};

export const getSingleCustomer = async (_id: any) => {
    return Order.findById(_id)
        .populate({
            path: 'customer',
            select: ['name', 'phone'],
        })
        .populate({
            path: 'service',
            select: 'name',
        })
        .populate({
            path: 'additional',
            select: 'name',
            strictPopulate: false
        });
};

export const orderForEmailSend = async (_id: any) => {
    return Order.findOne({ _id })
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
};

