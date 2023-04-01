import axiosService from './axios.service';

export const customerService = {
        getCustomerByPhone: (phone: string | null) => axiosService.get(`/customer/${phone}`).then(value => value.data),
        searchCustomers: (q: string) => axiosService.get(`/customer/?q=${q}`).then(value => value.data)
    }
