import { IBarberAdditional } from '../interfaces/additional.model';
import axiosService from './axios.service';

export const   barberAdditionalService = {
    create: (data: IBarberAdditional) => axiosService.post('/barberadditional', data).then(value => value.data)
};