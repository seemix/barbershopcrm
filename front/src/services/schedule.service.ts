import axiosService from './axios.service';
import { IScheduleCreate, IScheduleUpdate } from '../interfaces/schedule-create';

export const scheduleService = {
    getScheduleByBarber: (barberId: string) => axiosService.get('/schedule/' + barberId).then(value => value.data),
    createSchedule: (data: IScheduleCreate) => axiosService.post('/schedule', { data }).then(value => value.data),
    updateSchedule: (data: IScheduleUpdate) => axiosService.put(`/schedule`, { data }).then(value => value.data),
    deleteSchedule: (id: string | number) => axiosService.delete(`schedule/${id}`).then(value => value.data)
};