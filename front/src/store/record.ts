import { orderService } from '../services/order.service';
import { IRecord } from '../interfaces/record.model';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: IRecord = {
    barber: {
        name: null
    },
    customer: {
        name: null,
        email: null
    },
    service: {
        name: null
    },
    additional: [
        { name: null }
    ],
    startTime: null,
    price: null,
    status: null
};

export const getRecordById = createAsyncThunk(
    'recordSlice/getRecordById',
    async (orderId: string, thunkAPI) => {
        try {
            return await orderService.getOrderById(orderId);
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const recordSlice = createSlice({
    name: 'recordSlice',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getRecordById.fulfilled, (state, action:PayloadAction<IRecord>) => {
                state.barber.name = action.payload.barber.name;
                state.customer.name = action.payload.customer.name;
                state.customer.email = action.payload.customer.email;
                state.price = action.payload.price;
                state.service.name = action.payload.service.name;
                state.additional = action.payload.additional;
                state.startTime = action.payload.startTime;
                state.status = 'fulfilled';
            })
            .addCase(getRecordById.pending, state => {
                state.status = 'loading';
        })
    }
});
const recordStore = recordSlice.reducer;
export default recordStore;