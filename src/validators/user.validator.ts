import Joi from 'joi';

const userValidator = Joi.object({
    customerPhone: Joi.string().min(9).max(10).regex(/^\d+$/).message('Incorrect phone number'),
    customerEmail:  Joi.string().email({ tlds: { allow: false } }).message('Incorrect email'),
    customerName: Joi.string().min(2).max(25).message('Incorrect name format')
});

export default userValidator;