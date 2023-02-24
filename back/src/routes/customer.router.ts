import { Router } from 'express';
import Customer from '../models/customer.js';

const customerRouter = Router();
customerRouter.post('/', async (req, res, next) => {
    const newCustomer = await Customer.create(req.body);
    res.json(newCustomer);
});
customerRouter.get('/:customerPhone', async (req, res, next) => {
    const { customerPhone } = req.params;
    console.log(customerPhone);
    const customer = await Customer.findOne({ phone: customerPhone });
    res.json(customer);
});

export default customerRouter;