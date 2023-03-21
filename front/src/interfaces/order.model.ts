export interface IOrder {
     showBooking: boolean;
    customerId: string | null;
    customerName: string | null;
    customerPhone: string | null;
    customerEmail: string | null;
    barberId: string | null;
    serviceId: string | null;
    additionalServices: string[];
    startTime: string | null;
    endTime: string | null;
    duration: number | 0;
    price: number | 0;
    orderId: string | null;
    status: string | null;
    createdBy: string | null;
    comment: string | null;
    color: string | null;
}

interface IAdditional {
    _id: string | null;
    name: string | null;
}

export interface IShowCalendarOrder {
    _id: string | null;
    barber: string | null;
    customer: {
        _id: string | null;
        name: string | null;
        phone: string | null;
    };
    service: {
        _id: string | null;
        name: string | null;
    };
    additional: IAdditional[];
    startTime: string | null;
    endTime: string | null;
    price: number | null;
    createdAt: string | null;
    updatedAt: string | null;
}