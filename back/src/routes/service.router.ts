import { Router } from 'express';
import  servicesController  from '../controllers/services.controller.js';

const serviceRouter = Router();
serviceRouter.get('/', servicesController.getAllServices);
serviceRouter.post('/', servicesController.createService);
serviceRouter.post('/additional', servicesController.addAdditionalToService);

export default serviceRouter;