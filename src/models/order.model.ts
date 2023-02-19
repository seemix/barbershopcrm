export interface IOrder {
    customerName: string | null;
    customerPhone: string  | null;
    barberId: string  | null;
    serviceId: string  | null;
    additionalServices:  string[];
    dateTime: string | null;
    duration: number | 0;
    price: number | 0;
}