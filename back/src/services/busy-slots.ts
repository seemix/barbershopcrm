import moment from 'moment/moment.js';

import Order from '../models/order.js';
import Schedule from '../models/schedule.model.js';

export const busySlots = async (barberId: string | undefined) => {
    const start = Date.now();
    const end = moment(start).add(2, 'weeks').add(1, 'days');
    const timeTable = await Schedule.find({
        endTime: { $gte: moment(start).add(-1,'day'), $lte: end },
        barber: barberId
    })
        .select('startTime')
        .select('endTime');
    if(timeTable.length === 0)  return;
    const order = await Order.find({
        startTime: { $gte: start },
        barber: barberId
    })
        .select('startTime')
        .select('endTime');

    const timeSlots = [];
    const arr = timeTable.map(item => {
        return {
            startTime: item.startTime,
            endTime: item.endTime
        };
    }).sort((a, b) => Number(a['startTime']) > Number(b['startTime']) ? 1 : -1);
    if(moment(start) < moment(arr[0].startTime)) {
        timeSlots.push({
            startTime: arr[0].startTime,
            endTime: moment(Date.now())
        });
    }

    for (let i = 0; i < arr.length - 1; i++) {
        timeSlots.push({ startTime: moment(arr[i].endTime), endTime: moment(arr[i + 1].startTime) });
    }
    timeSlots.push({
        startTime: moment(timeTable[timeTable.length - 1].endTime),
        endTime: moment(timeTable[timeTable.length - 1].endTime)
    });
    const filteredOrder = order.map(item => ({
        startTime: moment(item.startTime), endTime: moment(item.endTime)
    }));
    for (const filteredOrderElement of filteredOrder) {
        if (filteredOrderElement.endTime <= timeSlots[timeSlots.length - 1].endTime) {
            timeSlots.push(filteredOrderElement);
        }
    }
    timeSlots.sort((a, b) => Number(a['startTime']) > Number(b['startTime']) ? 1 : -1);
    return timeSlots;
};