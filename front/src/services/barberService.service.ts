import axiosService from './axios.service';
import { IUpdateBarberService } from '../interfaces/barber-service.model';

export const barberServiceService = {
    getServicesByBarber: (barberId: string) => axiosService.get('/barberservice/'+barberId).then(value => value.data),
    getAllBarberServices: () => axiosService.get('/barberservice').then(value => value.data),
    getAdminBarberServices: () => axiosService.get('/barberservice/admin/').then(value => value.data),
    updateBarberService: (data: IUpdateBarberService) => axiosService.put('/barberservice/'+data._id, data).then(value => value.data),
    createBarberService: (data: IUpdateBarberService) => axiosService.post('/barberservice/',data).then(value => value.data),
    deleteBarberService: (_id:string) => axiosService.delete('/barberservice/'+_id).then(value => value.data)
}