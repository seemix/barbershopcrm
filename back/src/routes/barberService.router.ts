import { Router } from 'express';
import { barberServiceController } from '../controllers/barberService.controller.js';

const barberServiceRouter = Router();
// barberServiceRouter.get('/', barberServiceController.getAllBarberServices);
barberServiceRouter.post('/', barberServiceController.createBarberService);
barberServiceRouter.get('/admin/', barberServiceController.getAdminBarberServices);
barberServiceRouter.get('/:barber', barberServiceController.getBarberServicesByBarber);
barberServiceRouter.put('/:_id', barberServiceController.updateBarberService);
barberServiceRouter.patch('/:barberService', barberServiceController.updateBarberServiceAdditionals);
barberServiceRouter.delete('/:_id', barberServiceController.deleteBarberServiceById);
export default barberServiceRouter;
