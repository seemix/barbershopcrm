import axiosService from './axios.service';
import { IScheduleCreate } from '../interfaces/schedule-create';

export const scheduleService = {
    getScheduleByBarber: (barberId: string) => axiosService.get('/schedule/' + barberId).then(value => value.data),
    createSchedule: (data:IScheduleCreate) => axiosService.post('/schedule', { data }).then(value => value.data)
};