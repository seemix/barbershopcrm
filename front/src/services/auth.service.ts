import axiosService from './axios.service';

import { AxiosResponse } from 'axios';
import { IAuthResponse } from '../interfaces/auth-response';

export const authService = {
    login: (email: string, password: string): Promise<AxiosResponse<IAuthResponse>> =>
        axiosService.post('/auth/login', {
            email,
            password
        }).then(value => value.data),
    register: (email: string, password: string): Promise<AxiosResponse<IAuthResponse>> =>
        axiosService.post('/auth/register', {
            email,
            password
        }).then(value => value.data),
    logout: () => axiosService.post('/auth/logout').then(value => value.data)
};