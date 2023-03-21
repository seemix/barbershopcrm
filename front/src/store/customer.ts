import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { customerService } from '../services/customer.service';

export const searchCustomers = createAsyncThunk(
    'customers/Search',
    async (q:string, thunkAPI) => {
        try {
            return customerService.searchCustomers(q);
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const customers = createSlice({
    name: 'customersSlice',
    initialState: {
        error: null,
        status: '',
        customers: []
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(searchCustomers.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.error = null;
                state.customers = action.payload.map((item: { name: string; phone: string; }) => { return {
                    ...item,
                    label: item.name+' ('+item.phone+')'
                }})
            } )
    }
});

export const customersStore  = customers.reducer;
export default customersStore;