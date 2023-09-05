export class OrderDto {
    orderId;
    barber;
    customer;
    service;
    additional: string[];
    startTime;
    endTime;
    price;
    color;
    comment;
    customerName;
    customerPhone;
    customerEmail;

    constructor(order: any) {
        this.orderId = order.orderId;
        this.barber = order.barberId;
        this.customer = order.customerId;
        this.service = order.serviceId;
        this.additional = [...order.additionalServices];
        this.startTime = order.startTime;
        this.endTime = order.endTime;
        this.price = order.price;
        this.color = order.color;
        this.comment = order.comment;
        this.customerName = order.customerName;
        this.customerPhone = order.customerPhone;
        this.customerEmail = order.customerEmail;
    }
}