import moment from 'moment/moment.js';

import Order from '../models/order.js';
import Schedule from '../models/schedule.model.js';

interface ISlot {
    startTime: string | Date | moment.Moment;
    endTime: string | Date | moment.Moment;
}
const isInSchedule = (schedule: ISlot[], order: ISlot) =>
    schedule.some(scheduleElement =>
        order.startTime >= scheduleElement.startTime && order.endTime <= scheduleElement.startTime
    );

export const busySlots = async (barberId: string | undefined) => {
    const start = moment();
    const end = start.clone().add(2, 'weeks').add(1, 'days');

    const timeTable = await Schedule.find({
        endTime: { $gte: moment(start).add(-1,'day'), $lte: end },
        barber: barberId
    })
        .select('startTime')
        .select('endTime');

    if(timeTable.length === 0)  return [];

    const order = await Order.find({
        startTime: { $gte: start, $lte: end },
        barber: barberId
    })
        .select('startTime')
        .select('endTime');

    const timeSlots: ISlot[] = [];
    const sortedTimeTable = timeTable.map(item => {
        return {
            startTime: item.startTime,
            endTime: item.endTime
        };
    }).sort((a, b) => Number(a['startTime']) > Number(b['startTime']) ? 1 : -1);
    if(start.isBefore(moment(sortedTimeTable[0].startTime)) && start.isBefore(sortedTimeTable[0].endTime)) {
        timeSlots.push({
            startTime: moment(Date.now()),
            endTime: moment(sortedTimeTable[0].startTime)
        });
    }

    for (let i = 0; i < sortedTimeTable.length - 1; i++) {
        timeSlots.push({ startTime: moment(sortedTimeTable[i].endTime), endTime: moment(sortedTimeTable[i + 1].startTime) });
    }
    timeSlots.push({
        startTime: timeTable[timeTable.length - 1].endTime,
        endTime: timeTable[timeTable.length - 1].endTime
    });
    const filteredOrder = order.map(item => ({
        startTime: moment(item.startTime), endTime: moment(item.endTime)
    }));
    for (const filteredOrderElement of filteredOrder) {
        const inSchedule = isInSchedule(sortedTimeTable, filteredOrderElement);
        if(inSchedule) timeSlots.push(filteredOrderElement);
    }
    timeSlots.sort((a, b) => Number(a['startTime']) > Number(b['startTime']) ? 1 : -1);
    return timeSlots;
};

