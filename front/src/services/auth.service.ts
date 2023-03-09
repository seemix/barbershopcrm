import axiosService from './axios.service';

import { AxiosResponse } from 'axios';
import { IAuthResponse } from '../interfaces/auth-response';

export const authService = {
    login: (email: string, password: string): Promise<AxiosResponse<IAuthResponse>> =>
        axiosService.post('/auth/login', {
            email,
            password
        }),
    register: (email: string, password: string) =>
        axiosService.post('/auth/register', {
            email,
            password
        }).then(value => value.data),
    logout: () => axiosService.post('/auth/logout').then(value => value.data),
    checkAuth: () => axiosService.get('/auth/refresh',
        { withCredentials: true })
};