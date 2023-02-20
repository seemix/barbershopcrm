import { Router } from 'express';
import { barberScheduleController } from '../controllers/barberSchedule.js';

const scheduleRouter = Router();
scheduleRouter.get('/:barberId', barberScheduleController.getScheduleByBarber);
scheduleRouter.post('/', barberScheduleController.createBarberScheduler);

export default scheduleRouter;