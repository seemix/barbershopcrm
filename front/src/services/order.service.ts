import axiosService from './axios.service';
import { IOrder } from '../interfaces/order.model';

export const orderService = {
    getOrders: () => axiosService.get('/order').then(value => value.data),
    createOrder: (order: IOrder) => axiosService.post('/order', {...order}).then(value => value.data),
    getOrderById: (orderId: string) => axiosService.get('/order/' + orderId).then(value => value.data)
};