import { NextFunction, Request, Response, Router } from 'express';
import { orderController } from '../controllers/order.controller.js';
import Order from '../models/order.js';
import moment from 'moment';

const orderRouter = Router();
orderRouter.post('/', orderController.createOrder);
orderRouter.get('/slots', async (req: Request, res: Response, next: NextFunction) => {
    // const order = await Order.find();
    // const duration = 12;
    // let result = [];
    // const diff = moment.duration(moment(order[0].endTime).diff(order[0].startTime)).asMinutes();
    // const k = Math.floor(diff / duration);
    // let time = order[0].endTime;
    // result.push(time);
    // for (let i = 1; i <= k; i++) {
    //     result.push(moment(time).add(duration * i, 'minutes'));
    //
    // }
    // res.json(result);

    const startDay = '8:00';
    const endDay = '18:00';
    const lunchStart = '13:00';
    const lunchEnd = '14:00';
    const start = Date.now();
    const end = moment(start).add(1, 'month').add(1, 'day');
    const daysInMonth = moment.duration(end.diff(start)).asDays();
    let result = [];
    const order = await Order.find({ startTime: { $gte: start }, endTime: { $lte: end } })
        .select('startTime')
        .select('endTime');
    //NEW

    const duration = 30;


    //OLD ARRAY
    for (let i = 0; i < daysInMonth; i++) {
        let startTime = moment(start).add(i, 'day')
            .set('hours', +endDay.split(':', 2)[0])
            .set('minutes', +endDay.split(':', 2)[1])
            .set('seconds', 0)
            .set('milliseconds', 0);
        console.log(moment(startTime).day());

        let endTime = moment(start).add(i + 1, 'day')
            .set('hours', +startDay.split(':', 2)[0])
            .set('minutes', +startDay.split(':', 2)[1])
            .set('seconds', 0)
            .set('milliseconds', 0);
        result.push({ startTime: startTime, endTime: endTime });

        startTime = moment(start).add(i, 'day')
            .set('hours', +lunchStart.split(':', 2)[0])
            .set('minutes', +lunchEnd.split(':', 2)[1])
            .set('seconds', 0)
            .set('milliseconds', 0);

        endTime = moment(start).add(i , 'day')
            .set('hours', +lunchEnd.split(':', 2)[0])
            .set('minutes', +lunchEnd.split(':', 2)[1])
            .set('seconds', 0)
            .set('milliseconds', 0);
        result.push({ startTime: startTime, endTime: endTime });

    }
    const filteredOrder = order.map(item => ({
        startTime: moment(item.startTime), endTime: moment(item.endTime)
    }));
    result = filteredOrder.concat(result).sort((a,b) => Number(a['startTime']) > Number(b['startTime']) ? 1 : -1)
    res.json(result);
});

export default orderRouter;