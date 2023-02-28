import axiosService from './axios.service';

export const customerService = {
    getCustomerByPhone: (phone: string | null) => axiosService.get(`/customer/${phone}`).then(value => value.data)
};
