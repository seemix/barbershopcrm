import Customer from '../models/customer.js';

export const searchObject = (search: string) => {
    return {
        $or: [
            { name: { $regex: '.*' + search + '.*', $options: 'i' } },
            { phone: { $regex: '.*' + search + '.*', $options: 'i' } },
            { email: { $regex: '.*' + search + '.*', $options: 'i' } },
            { tag: { $regex: '.*' + search + '.*', $options: 'i' } },
        ]
    };
};

export const searchCustomers = async (q:string) => {
    return Customer.find({
        $or: [
            { name: { $regex: '.*' + q + '.*', $options: 'i' } },
            { phone: { $regex: '.*' + q + '.*', $options: 'i' } },
        ],
    });
}