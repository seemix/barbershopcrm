import { Router } from 'express';
import { additionalController } from '../controllers/additional.controller.js';

const additionalRouter = Router();
additionalRouter.post('/', additionalController.createAdditional);
additionalRouter.get('/', additionalController.getAllAdditional);

export default additionalRouter;
