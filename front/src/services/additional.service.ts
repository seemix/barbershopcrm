import axiosService from './axios.service';

export const additionalService = {
    getAdditionalByBarberAndService: (barberId: string | null, serviceId: string | null) =>
        axiosService.get(`/barberadditional?barberId=${barberId}&serviceId=${serviceId}`).then(value => value.data)
};