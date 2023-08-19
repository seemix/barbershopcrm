import axiosService from './axios.service';
import { IAdd, IBarberAdditional } from '../interfaces/additional.model';

export const additionalService = {
    getAdditionalByBarberAndService: (barberId: string | null, serviceId: string | null) =>
        axiosService.get(`/barberadditional/bs?barberId=${barberId}&serviceId=${serviceId}`).then(value => value.data),
    getAllAdditionals: () => axiosService.get('/additional').then(value => value.data),
    createAdditional: (data: IAdd) => axiosService.post('/additional',data).then(value => value.data),
    deleteAdditional: (_id: string) => axiosService.delete(('/additional/'+_id)).then(value => value.data),
    updateAdditional: (data: IAdd) => axiosService.put('/additional/'+data._id,data).then(value => value.data),
    saveAdditionalOrder: (arr: IAdd[]) => axiosService.patch('/additional', arr).then(value => value.data),
    getAdditionalsByBarber: (barberId: string) => axiosService.get('/barberadditional/'+barberId).then(value => value.data),
    updateBarberAdditional: (data: IBarberAdditional) => axiosService.put('/barberadditional', data).then(value => value.data)

};