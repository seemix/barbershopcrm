import Joi from 'joi';

const priceDurationValidator = Joi.object({
    price: Joi.number().min(10).message('minimal price is 10').max(500).message('maximal price is 500').required(),
    duration: Joi.number().min(5).message('minimal duration is 5 min').max(120).message('maximun duration is 120 min').required(),
    _id: Joi.string(),
    barber: Joi.string(),
    additional: Joi.string()
});

export default priceDurationValidator;