import { Router } from 'express';
import { barberAdditionalController } from '../controllers/barberAdditional.controller.js';

const barberAdditionalRouter = Router();
barberAdditionalRouter.get('/bs', barberAdditionalController.getAdditionalsByBarberAndService);
barberAdditionalRouter.post('/', barberAdditionalController.createBarberAdditional);
// barberAdditionalRouter.get('/', barberAdditionalController.getAdditionalForBooking);
// barberAdditionalRouter.get('/filter', barberAdditionalController.getFilteredAdditionals);
barberAdditionalRouter.get('/:barberId', barberAdditionalController.getAdditionalByBarber);
barberAdditionalRouter.put('/', barberAdditionalController.updateBarberAdditional);
barberAdditionalRouter.delete('/:_id',barberAdditionalController.deleteBarberAdditionalById);

export default barberAdditionalRouter;