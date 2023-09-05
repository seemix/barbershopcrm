import { ProcessedEvent } from '@aldabil/react-scheduler/types';

export interface IOrder {
    showBooking: boolean;
    error: string | null;
    orders: ProcessedEvent[];
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

export interface IOrderState extends IOrder {
    orderForEdit: any;
    orderEditModal: boolean;
}
