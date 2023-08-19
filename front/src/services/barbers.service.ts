import axiosService from './axios.service';

export const barbersService = {
    getAll: axiosService.get(`/barbers`).then(value => value.data),
    getById: (barberId: string) => axiosService.get('/barbers/'+barberId).then(value => value.data)
}