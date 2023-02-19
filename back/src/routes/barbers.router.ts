import { Router } from 'express';
import { barbersController } from '../controllers/barbers.controller.js';

const barbersRouter = Router();
barbersRouter.post('/', barbersController.createBarber);
barbersRouter.get('/', barbersController.getAllBarbers);
export default barbersRouter;