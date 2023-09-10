import axiosService from './axios.service';
import { ICustomerParams, ISingleCustomer } from '../interfaces/customer.model';

export const customerService = {
    getAllCustomers: (params: ICustomerParams) => axiosService.get('/customer/all', { params }).then(value => value.data),
    getCustomerByPhone: (phone: string | null) => axiosService.get(`/customer/${phone}`).then(value => value.data),
    searchCustomers: (q: string) => axiosService.get(`/customer/?q=${q}`).then(value => value.data),
    createCustomer: (customer: ISingleCustomer) => axiosService.post('/customer', customer).then(value => value.data),
    updateCustomer: (customer: ISingleCustomer) => axiosService.put('/customer/'+customer._id, customer).then(value => value.data),
    deleteCustomer: (_id: string) => axiosService.delete('/customer/'+_id).then(value => value.data),
    getCustomerInfo: (_id: string) => axiosService.get('/customer/info/'+_id).then(value => value.data)
};