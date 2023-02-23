import { Router } from 'express';
import Customer from '../models/customer.js';

const customerRouter = Router();
customerRouter.post('/', async (req, res, next) => {
    const newCustomer = await Customer.create(req.body);
    res.json(newCustomer);
});

export default customerRouter;