import { Router } from 'express';
import { barberServiceController } from '../controllers/barberService.controller.js';

const barberServiceRouter = Router();
barberServiceRouter.get('/', barberServiceController.getAllBarberServices);
barberServiceRouter.post('/', barberServiceController.createBarberService);
barberServiceRouter.get('/admin/', barberServiceController.getAdminBarberServices);
barberServiceRouter.get('/:barber', barberServiceController.getBarberServicesByBarber);
barberServiceRouter.patch('/:barberService', barberServiceController.updateBarberServiceAdditionals);
export default barberServiceRouter;
