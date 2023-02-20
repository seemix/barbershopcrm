import { NextFunction, Request, Response, Router } from 'express';
import { orderController } from '../controllers/order.controller.js';

import { busyArray } from '../services/createBusyArray.js';
import ApiError from '../errors/api.error.js';
import moment from 'moment';

const orderRouter = Router();
orderRouter.post('/', orderController.createOrder);
orderRouter.get('/slots', async (req: Request, res: Response, next: NextFunction) => {
    const { barberId, duration = 1 } = req.query;
    if (!barberId || !duration) {
        next(new ApiError('Bad request params', 400));
    }

    const arr = await busyArray(String(barberId));
    const nowMinutes = Math.ceil((moment().minutes() / 10)) * 10;
    const start = moment(Date.now()).set('minutes', nowMinutes).set('seconds', 0).set('milliseconds', 0);

    let slots = [];
    let j;
    if (start > arr[0].startTime) j = 1;
    else j = 0;
    const diff = moment.duration(moment(arr[j].startTime).diff(start)).asMinutes();
    const k = Math.floor(diff / +duration);
    for (let i = 0; i < k; i++) {
        slots.push({
                id: i,
                startTime: moment(start).add(+duration * i, 'minutes'),
                endTime: moment(start).add(+duration * i, 'minutes').add(+duration, 'minutes')
            }
        );
    }

    for (let i = 1; i < arr.length-1; i++) {
        const diff = moment.duration(moment(arr[i+1].startTime).diff(moment(arr[i].endTime))).asMinutes();
        const k = Math.floor(diff / +duration);
        console.log(k);
        for (let s = 0; s < k; s++) {
            if (k > 0) {
                slots.push({
                    id: Math.random() * 100,
                    startTime: moment(arr[i].endTime).add(+duration * s, 'minutes'),
                    endTime: moment(arr[i].endTime).add(+duration * s, 'minutes').add(+duration, 'minutes')
                });
            }
        }
    }
   //  const diff = moment.duration(moment(arr[j].endTime.diff(arr[j + 1].startTime)).asMinutes();
    res.json(slots);
//1. Make 5 min offset
//2. Make slots from now+offset to first busy start
//3. Make loop for every finish-start slot
//4. Make slots from last end to end day;
//5. Make timezone offset



})
;
export default orderRouter;