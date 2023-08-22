import { IBarberAdditional } from '../interfaces/additional.model';
import axiosService from './axios.service';

export const   barberAdditionalService = {
    create: (data: IBarberAdditional) => axiosService.post('/barberadditional', data).then(value => value.data),
    deleteById: (_id:string) => axiosService.delete('/barberadditional/'+_id).then(value => value.data)
};