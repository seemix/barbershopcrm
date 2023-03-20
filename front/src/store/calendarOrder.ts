import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { orderService } from '../services/order.service';
import { ProcessedEvent } from '@aldabil/react-scheduler/types';

interface IInitialState {
    status: string | null;
    error: string | null;
    orders: ProcessedEvent[];
}

const initialState: IInitialState = {
    error: null,
    status: null,
    orders: []
}
export const getOrdersForCalendar = createAsyncThunk(
    'orderCalendar/getOrders',
    async (_, thunkAPI) => {
        try {
            return orderService.getOrders();
        } catch (e) {
            thunkAPI.rejectWithValue(e);
        }
    }
);

export const orderCalendarSlice = createSlice({
    name: 'orderCalendarSlice',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getOrdersForCalendar.fulfilled, (state, action) => {
               state.status = 'fulfilled';
               state.error = null;
                // @ts-ignore
                state.orders = action.payload.map(item => {
                    return {
                        event_id: item._id,
                        title: item.service.name,
                        admin_id: item.barber,
                        start: new Date(item.startTime),
                        end: new Date(item.endTime),
                        color: item.color || '',
                        customer: item.customer.name,
                        phone: item.customer.phone
                    };
                });
            })
    }
});

export const orderCalendarStore = orderCalendarSlice.reducer;
export default orderCalendarStore;