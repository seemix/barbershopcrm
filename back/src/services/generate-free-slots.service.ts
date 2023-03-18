import { busySlots } from './busy-slots.js';
import moment from 'moment/moment.js';

export const freeSlots = async (barberId: string, duration: string) => {
    const arr = await busySlots(String(barberId));
    const nowMinutes = Math.ceil((moment().minutes() / 10)) * 10;
    let start = moment(Date.now()).set('minutes', nowMinutes).set('seconds', 0).set('milliseconds', 0);
    let finish = moment(arr[0].startTime);
    let slots = [];

    const diff = moment.duration(finish.diff(start)).asMinutes();
    const k = Math.floor(diff / +duration);
    for (let i = 0; i < k; i++) {
        slots.push({
            id: moment.duration(Number(arr[i].endTime) + Number(duration) * i).asMilliseconds(),
            startTime: moment(start).add(+duration * i, 'minutes'),
            endTime: moment(start).add(+duration * i, 'minutes').add(+duration, 'minutes')
        });
    }
    for (let i = 0; i < arr.length - 1; i++) {
        const diff = moment.duration(moment(arr[i + 1].startTime).diff(moment(arr[i].endTime))).asMinutes();
        const k = Math.floor(diff / +duration);
        for (let s = 0; s < k; s++) {
            if (k > 0) {
                slots.push({
                    id: moment.duration(Number(arr[i].endTime) + Number(duration) * s).asMilliseconds(),
                    startTime: moment(arr[i].endTime).add(+duration * s, 'minutes'),
                    endTime: moment(arr[i].endTime).add(+duration * s, 'minutes').add(+duration, 'minutes')
                });
            }
        }
    }

    return slots;
};