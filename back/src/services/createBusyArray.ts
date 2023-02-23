import moment from 'moment/moment.js';
import Order from '../models/order.js';
import Schedule from '../models/barberSchedule.js';

export const busyArray = async (barberId: string | undefined) => {

    let result = [];
    let breakStart;
    let breakEnd;
    const start = Date.now();
    const end = moment(start).add(1, 'month').add(1, 'day');
    const daysInMonth = moment.duration(end.diff(start)).asDays();
    const order = await Order.find({ startTime: { $gte: start }, endTime: { $lte: end }, barber: barberId })
        .select('startTime')
        .select('endTime');
    const schedule: any = await Schedule.findOne({ barber: barberId });
    const { startDay, endDay, startLunch, endLunch, holidays } = schedule.toObject();

    //add extra slot if now is non-working hours
    if (start > Number(moment(start).add(-1, 'day').set('hours', +endDay.split(':', 2)[0])
        .set('minutes', +endDay.split(':', 2)[1])
        .set('seconds', 0)
        .set('milliseconds', 0)) && start < Number(moment(start).set('hours', +startDay.split(':', 2)[0])
        .set('minutes', +startDay.split(':', 2)[1])
        .set('seconds', 0)
        .set('milliseconds', 0))) {

        result.push({
            startTime: moment(start),
            endTime: moment(start)
                .set('hours', +startDay.split(':', 2)[0])
                .set('minutes', +endDay.split(':', 2)[1])
                .set('seconds', 0)
                .set('milliseconds', 0)

        });
    }

    //add extra slot if now is lunch
    if (start > Number(moment(start).set('hours', +startLunch.split(':', 2)[0])
        .set('minutes', +endLunch.split(':', 2)[1])
        .set('seconds', 0)
        .set('milliseconds', 0)) && start < Number(moment(start).set('hours', +endLunch.split(':', 2)[0])
        .set('minutes', +endLunch.split(':', 2)[1])
        .set('seconds', 0)
        .set('milliseconds', 0))) {

        result.push({
            startTime: moment(start),
            endTime: moment(start)
                .set('hours', +endLunch.split(':', 2)[0])
                .set('minutes', +endLunch.split(':', 2)[1])
                .set('seconds', 0)
                .set('milliseconds', 0)

        });
    }
    for (let i = 0; i < daysInMonth; i++) {
        let startTime = moment(start).add(i, 'day')
            .set('hours', +endDay.split(':', 2)[0])
            .set('minutes', +endDay.split(':', 2)[1])
            .set('seconds', 0)
            .set('milliseconds', 0);

        let endTime = moment(start).add(i + 1, 'day')
            .set('hours', +startDay.split(':', 2)[0])
            .set('minutes', +startDay.split(':', 2)[1])
            .set('seconds', 0)
            .set('milliseconds', 0);
        result.push({ startTime: startTime, endTime: endTime });

        if (holidays.includes(+moment(startTime.day()))) {
            breakStart = startDay;
            breakEnd = endDay;
        } else {
            breakStart = startLunch;
            breakEnd = endLunch;
        }
        startTime = moment(start).add(i, 'day')
            .set('hours', +breakStart.split(':', 2)[0])
            .set('minutes', +breakStart.split(':', 2)[1])
            .set('seconds', 0)
            .set('milliseconds', 0);

        endTime = moment(start).add(i, 'day')
            .set('hours', +breakEnd.split(':', 2)[0])
            .set('minutes', +breakEnd.split(':', 2)[1])
            .set('seconds', 0)
            .set('milliseconds', 0);
        result.push({ startTime: startTime, endTime: endTime });

    }
    const filteredOrder = order.map(item => ({
        startTime: moment(item.startTime), endTime: moment(item.endTime)
    }));
    result = filteredOrder.concat(result).sort((a, b) => Number(a['startTime']) > Number(b['startTime']) ? 1 : -1);
    return result;
};

