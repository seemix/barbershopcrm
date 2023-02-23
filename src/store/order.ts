import { IOrder } from '../models/order.model';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: IOrder = {
    barberId: null,
    customerId: null,
    customerName: null,
    customerPhone: null,
    customerEmail: null,
    serviceId: null,
    additionalServices: [],
    startTime: null,
    endTime: null,
    price: 0,
    duration: 0
};

interface IAdditional {
    _id: string | '';
    price: number;
    duration: number;
}

export const orderSlice = createSlice({
    name: 'orderSlice',
    initialState,
    reducers: {
        setBarber(state, action) {
            state.barberId = action.payload;
        },
        setService(state, action) {
            state.serviceId = action.payload.serviceId;
            state.duration = action.payload.duration;
            state.price = action.payload.price;
        },
        resetService(state) {
            state.serviceId = null;
            state.duration = 0;
            state.price = 0;
        },
        addAdditional(state, action: PayloadAction<IAdditional>) {
            state.additionalServices.push(action.payload._id);
            state.price = state.price + action.payload.price;
            state.duration = state.duration + action.payload.duration;
        },
        removeAdditional(state, action) {
            state.price = state.price - action.payload.price;
            state.duration = state.duration - action.payload.duration;
            state.additionalServices = state.additionalServices.filter(item => item !== action.payload._id);
        },
        setDateTime(state, action) {
            state.startTime = action.payload.startTime;
            state.endTime = action.payload.endTime;
        },
        removeDateTime(state) {
            state.startTime = null;
            state.endTime = null;
        }
    }
});

export const {
    setBarber,
    setService,
    resetService,
    addAdditional,
    removeAdditional,
    setDateTime,
    removeDateTime
} = orderSlice.actions;
export const orderStore = orderSlice.reducer;
export default orderStore;