import { Types } from 'mongoose';
import Order from '../models/order.js';

export  const calculateCustomerStats = (customerId: string) => {
    const pipeline = [
        {
            $match: {
                customer: new Types.ObjectId(customerId),
            },
        },
        {
            $sort: { createdAt: -1 },
        },
        {
            $group: {
                _id: customerId,
                createdAt: { $first: '$createdAt' },
                lastOrderPayed: { $first: '$payed' },
                lastOrderDate: { $first: '$endTime' },
                allOrdersPayed: { $sum: '$payed' },
                orderCount: { $sum: 1 },
            },
        },
        {
            $project: {
                createdAt: 1,
                lastOrderPayed: 1,
                lastOrderDate: 1,
                allOrdersPayed: 1,
                averageBill: { $divide: ['$allOrdersPayed', '$orderCount'] },
            },
        },
    ];
    // @ts-ignore
    return Order.aggregate(pipeline);
};