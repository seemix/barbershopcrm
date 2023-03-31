import axiosService from './axios.service';
import { IAllService } from '../interfaces/service.model';

export const serviceService = {
    getServicesByBarber: (barberId: string) => axiosService.get(`/barberservice/${barberId}`).then(value => value.data),
    getALL: () => axiosService.get('/services').then(value => value.data),
    saveOrder: (arr: IAllService[]) => axiosService.patch('/services', arr).then(value => value.data),
    createService: (data: IAllService) => axiosService.post('/services', data).then(value => value.data),
    deleteService: (_id: string) => axiosService.delete('/services/' + _id).then(value => value.data),
    updateService: (data: IAllService) => axiosService.put('/services/' + data._id, data).then(value => value.data)
};