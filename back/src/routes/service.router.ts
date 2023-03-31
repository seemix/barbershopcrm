import { Router } from 'express';
import  servicesController  from '../controllers/services.controller.js';

const serviceRouter = Router();
serviceRouter.get('/', servicesController.getAllServices);
serviceRouter.post('/', servicesController.createService);
serviceRouter.patch('/',servicesController.updateOrder);
serviceRouter.delete('/:id',servicesController.deleteService);
serviceRouter.put('/:id',servicesController.updateService);
serviceRouter.post('/additional', servicesController.addAdditionalToService);

export default serviceRouter;