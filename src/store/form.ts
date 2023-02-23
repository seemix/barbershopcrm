import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { customerService } from '../services/customer.service';

export const getCustomerByPhone = createAsyncThunk(
    'formSlice/getCustomerByPhone',
    async (phone: string | null, thunkAPI) => {
        try {
            return await customerService.getCustomerByPhone(phone);
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);
export const formSlice = createSlice({
    name: 'formSlice',
    initialState: {
        customerId: null,
        customerPhone: null,
        customerEmail: null,
        customerName: null
    },
    reducers: {},
    extraReducers: {}
});

export const formStore = formSlice.reducer;
export default formStore;