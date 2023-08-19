import Barber from '../models/barber.js';

export const getPrices = async () => {
    return  Barber.aggregate([
        {
            $lookup: {
                from: 'barberservices',
                localField: '_id',
                foreignField: 'barber',
                as: 'services',
            },
        },
        {
            $unwind: {
                path: '$services',
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $lookup: {
                from: 'services',
                localField: 'services.service',
                foreignField: '_id',
                as: 'services.service',
            },
        },
        {
            $unwind: {
                path: '$services.service',
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $lookup: {
                from: 'barberadditionals',
                localField: 'services.additionals',
                foreignField: '_id',
                as: 'services.additionals',
            },
        },
        {
            $unwind: {
                path: '$services.additionals',
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $lookup: {
                from: 'additionals',
                localField: 'services.additionals.additional',
                foreignField: '_id',
                as: 'services.additionals.additional',
            },
        },
        {
            $unwind: {
                path: '$services.additionals.additional',
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $sort: {
                order: 1, // Sort by the "order" field in ascending order (1 to 5)
            },
        },
        {
            $group: {
                _id: '$_id',
                name: { $first: '$name' },
                picture: {$first: '$picture'},
                order: {$first: '$order'},
                services: {
                    $push: {
                        _id: '$services._id',
                        name: '$services.service.name',
                        price: '$services.price',
                        duration: '$services.duration',
                        additionals: {
                            $cond: [
                                { $gt: ['$services.additionals._id', null] },
                                {
                                    _id: '$services.additionals._id',
                                    name: '$services.additionals.additional.name',
                                    price: '$services.additionals.price',
                                    duration: '$services.additionals.duration',
                                },
                                null,
                            ],
                        },
                    },
                },
            },
        },
    ]);
}