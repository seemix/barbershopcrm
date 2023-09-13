import { Router } from 'express';
import { orderController } from '../controllers/order.controller.js';

const orderRouter = Router();
orderRouter.post('/', orderController.createOrder);
orderRouter.get('/', orderController.getOrders);
orderRouter.delete('/:id', orderController.deleteOrderById);
orderRouter.put('/:id', orderController.updateOrderById);
orderRouter.get('/new/:orderId', orderController.getOrderById);
orderRouter.get('/slots', orderController.generateSlots);
orderRouter.patch('/', orderController.updateOrderTime);

export default orderRouter;