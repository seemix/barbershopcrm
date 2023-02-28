import axiosService from './axios.service';

export const freeSlotsService = {
    getSlots: (barberId: string, duration: string) =>
        axiosService.get(`/order/slots?barberId=${barberId}&duration=${duration}`).then(value => value.data)
};