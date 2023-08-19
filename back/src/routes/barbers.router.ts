import { Router } from 'express';
import { barbersController } from '../controllers/barbers.controller.js';

const barbersRouter = Router();
barbersRouter.post('/', barbersController.createBarber);
barbersRouter.get('/', barbersController.getAllBarbers);
barbersRouter.get('/:barberId', barbersController.getBarberById);
export default barbersRouter;