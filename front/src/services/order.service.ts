import axiosService from './axios.service';
import { IOrder } from '../models/order.model';

export const orderService = {
    createOrder: (order: IOrder) => axiosService.post('/order', {...order}).then(value => value.data),
    getOrderById: (orderId: string) => axiosService.get('/order/' + orderId).then(value => value.data)
};