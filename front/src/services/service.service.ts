import axiosService from './axios.service';

export const serviceService = {
    getServicesByBarber: (barberId: string) => axiosService.get(`/barberservice/${barberId}`).then(value => value.data),
    getALL: () => axiosService.get('/services').then(value => value.data)
}