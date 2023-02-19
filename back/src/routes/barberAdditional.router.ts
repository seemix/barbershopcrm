import { Router } from 'express';
import { barberAdditionalController } from '../controllers/barberAdditional.controller.js';

const barberAdditionalRouter = Router();
barberAdditionalRouter.post('/', barberAdditionalController.createBarberAdditional);
barberAdditionalRouter.get('/',barberAdditionalController.getAdditionalForBooking);

export default barberAdditionalRouter;