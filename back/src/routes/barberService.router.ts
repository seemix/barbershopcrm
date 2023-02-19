import { Router } from 'express';
import { barberServiceController } from '../controllers/barberService.controller.js';

const barberServiceRouter = Router();
barberServiceRouter.get('/', barberServiceController.getAllBarberServices);
barberServiceRouter.post('/', barberServiceController.createBarberService);
barberServiceRouter.get('/:barber', barberServiceController.getBarberServicesByBarber);

export default barberServiceRouter;
