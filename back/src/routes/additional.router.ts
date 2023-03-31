import { Router } from 'express';
import { additionalController } from '../controllers/additional.controller.js';

const additionalRouter = Router();
additionalRouter.post('/', additionalController.createAdditional);
additionalRouter.get('/', additionalController.getAllAdditional);
additionalRouter.put('/:id', additionalController.updateAdditional);
additionalRouter.delete('/:id',additionalController.deleteAdditional);
additionalRouter.patch('/',additionalController.updateAdditionalOrder);

export default additionalRouter;
