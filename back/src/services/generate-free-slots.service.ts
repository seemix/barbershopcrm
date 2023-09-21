import { busySlots } from './busy-slots.js';
import moment from 'moment/moment.js';

export const freeSlots = async (barberId: string, duration: string) => {
    const arr = await busySlots(String(barberId));
    if(!arr) return [];

    const nowMinutes = Math.ceil((moment().minutes() / 5)) * 5;
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
//
// import moment from 'moment';
//
// import { busySlots } from './busy-slots.js';
// interface IFreeSlot {
//     id: number | string;
//     startTime: moment.Moment;
//     endTime: moment.Moment
// }
// export const freeSlots = async (barberId: string, duration: string) => {
//     const busyTimeSlots = await busySlots(String(barberId));
//     if (!busyTimeSlots || busyTimeSlots.length === 0) return [];
//
//     //const nowMinutes = Math.ceil(moment().minutes() / 5) * 5;
//    // const start = moment().minutes(nowMinutes).seconds(0).milliseconds(0);
//
//     const freeSlots: IFreeSlot[] = busyTimeSlots.reduce((slots: IFreeSlot[], busySlot, index) => {
//         if (index < busyTimeSlots.length - 1) {
//             const busyEndTime = moment(busyTimeSlots[index].endTime);
//             const nextBusyStartTime = moment(busyTimeSlots[index + 1].startTime);
//
//             const diff = nextBusyStartTime.diff(busyEndTime, 'minutes');
//             const numberOfSlots = Math.floor(diff / +duration);
//
//             for (let i = 0; i < numberOfSlots; i++) {
//                 const slotStartTime = busyEndTime.add(+duration * i, 'minutes');
//                 const slotEndTime = slotStartTime.clone().add(+duration, 'minutes');
//
//                 slots.push({
//                     id: slotStartTime.valueOf(),
//                     startTime: slotStartTime,
//                     endTime: slotEndTime
//                 });
//             }
//         }
//         return slots;
//     }, []);
//
//     return freeSlots;
// };