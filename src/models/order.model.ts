export interface IOrder {
    customerId: string | null;
    customerName: string | null;
    customerPhone: string  | null;
    customerEmail: string | null;
    barberId: string  | null;
    serviceId: string  | null;
    additionalServices:  string[];
    startTime: string | null;
    endTime: string | null;
    duration: number | 0;
    price: number | 0;
}