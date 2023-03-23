import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { customerService } from '../services/customer.service';

interface ICustomer {
    _id: string | null;
    phone: string | null;
    name: string | null;
    email: string | null;
}

interface IInitialState {
    error: string | null;
    status: string | null;
    customers: [],
    customer: ICustomer
}

const initialState: IInitialState = {
    customer: {_id: null, name: null, email: null, phone: null},
    customers: [],
    error: null,
    status: null
}

export const searchCustomers = createAsyncThunk(
    'customers/Search',
    async (q: string, thunkAPI) => {
        try {
            return customerService.searchCustomers(q);
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);
export const getCustomerByPhone = createAsyncThunk(
    'orderSlice/getCustomerByPhone',
    async (phone: string | null, thunkAPI) => {
        try {
            return await customerService.getCustomerByPhone(phone);
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    });

export const customers = createSlice({
    name: 'customersSlice',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(searchCustomers.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.error = null;
                state.customers = action.payload.map((item: { name: string; phone: string; }) => {
                    return {
                        ...item,
                        label: item.name + ' (' + item.phone + ')'
                    };
                });
            })
            .addCase(getCustomerByPhone.fulfilled, (state, action) => {
                state.customer.email = action.payload.email;
                state.customer.name = action.payload.name;
                state.customer.phone = action.payload.phone;
                state.customer._id = action.payload._id;
                state.status = 'fulfilled';
            })
            .addCase(getCustomerByPhone.rejected, state => {

            });
    }
});

export const customersStore = customers.reducer;
export default customersStore;