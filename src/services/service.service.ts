import axiosService from './axios.service';

export const serviceService = {
    getServicesByBarber: (barberId: string) => axiosService.get(`/barberservice/${barberId}`).then(value => value.data)
};