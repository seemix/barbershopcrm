import axiosService from './axios.service';
import { IBarber } from '../interfaces/barber.model';

export const barbersService = {
    getAll: axiosService.get(`/barbers`).then(value => value.data),
    getById: (barberId: string) => axiosService.get('/barbers/'+barberId).then(value => value.data),
    saverOrder: (arr: IBarber[]) => axiosService.patch('/barbers', arr).then(value => value.data)
}