import axiosService from './axios.service';
import { IOrder } from '../interfaces/order.model';

export const orderService = {
    getOrders: () => axiosService.get('/order').then(value => value.data),
    createOrder: (order: IOrder) => axiosService.post('/order', { ...order }).then(value => value.data),
    getOrderById: (orderId: string) => axiosService.get('/order/new/' + orderId).then(value => value.data),
    deleteOrderById: (orderId: string | number) => axiosService.delete('/order/' + orderId).then(value => value.data),
    updateOrderById: (order: IOrder) => axiosService.put('/order/' + order.orderId, order).then(value => value.data)
};