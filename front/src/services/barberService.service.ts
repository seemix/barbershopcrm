import axiosService from './axios.service';

export const barberServiceService = {
    getServicesByBarber: (barberId: string) => axiosService.get('/barberservice/'+barberId).then(value => value.data),
    getAllBarberServices: () => axiosService.get('/barberservice').then(value => value.data),
    getAdminBarberServices: () => axiosService.get('/barberservice/admin/').then(value => value.data)
}