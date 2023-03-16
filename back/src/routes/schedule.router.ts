import { Router } from 'express';

import { barberScheduleController } from '../controllers/barberSchedule.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { roles } from '../config/roles.config.js';

const scheduleRouter = Router();
scheduleRouter.get('/:barberId',
    authMiddleware([roles.admin, roles.user]),
    barberScheduleController.getScheduleByBarber);
scheduleRouter.get('/',barberScheduleController.getAllSchedules);
scheduleRouter.post('/', barberScheduleController.createBarberScheduler);
scheduleRouter.put('/', barberScheduleController.updateSchedule);
scheduleRouter.delete('/:id', barberScheduleController.deleteSchedule);

export default scheduleRouter;