import { Router } from 'express';
import Customer from '../models/customer.js';
import ApiError from '../errors/api.error.js';
import { customerController } from '../controllers/customer.controller.js';

const customerRouter = Router();
customerRouter.post('/', async (req, res, next) => {
    const newCustomer = await Customer.create(req.body);
    res.json(newCustomer);
});
customerRouter.get('/all', customerController.getAllCustomers);

customerRouter.get('/:customerPhone', async (req, res, next) => {
    const { customerPhone } = req.params;
    try {
        const customer = await Customer.findOne({ phone: customerPhone });
        res.json(customer);
    } catch (e) {
        next(new ApiError('Error retrieving customer', 400));
    }
});
customerRouter.get('/', customerController.searchCustomers);

export default customerRouter;