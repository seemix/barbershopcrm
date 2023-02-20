import { Router } from 'express';
import barbersRouter from './barbers.router.js';
import serviceRouter from './service.router.js';
import additionalRouter from './additional.router.js';
import barberServiceRouter from './barberService.router.js';
import barberAdditionalRouter from './barberAdditional.router.js';
import orderRouter from './order.router.js';
import scheduleRouter from './schedule.router.js';


const router = Router();
router.use('/barbers', barbersRouter);
router.use('/services', serviceRouter);
router.use('/additional', additionalRouter);
router.use('/barberservice', barberServiceRouter);
router.use('/barberadditional',barberAdditionalRouter);
router.use('/order', orderRouter);
router.use('/schedule', scheduleRouter);

export default router;