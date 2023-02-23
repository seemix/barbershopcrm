import { Router } from 'express';
import { orderController } from '../controllers/order.controller.js';

const orderRouter = Router();
orderRouter.post('/', orderController.createOrder);
orderRouter.get('/slots', orderController.generateSlots);


//1. Make 5 min offset
//2. Make slots from now+offset to first busy start
//3. Make loop for every finish-start slot
//4. Make slots from last end to end day;
//5. Make timezone offset


export default orderRouter;