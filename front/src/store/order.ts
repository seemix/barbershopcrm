import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IOrder } from '../interfaces/order.model';
import { customerService } from '../services/customer.service';
import { orderService } from '../services/order.service';

const initialState: IOrder = {
    showBooking: false,
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
    duration: 0,
    orderId: null,
    status: 'new',
    color: '#9e8a78',
    comment: '',
    createdBy: ''
};

interface IAdditional {
    _id: string | '';
    price: number;
    duration: number;
}

export const getCustomerByPhone = createAsyncThunk(
    'orderSlice/getCustomerByPhone',
    async (phone: string | null, thunkAPI) => {
        try {
            return await customerService.getCustomerByPhone(phone);
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    });

export const createOrder = createAsyncThunk(
    'orderSlice/createOrder',
    async (order: IOrder, thunkAPI) => {
        try {
            return await orderService.createOrder(order);
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

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
        },
        setCustomer(state, action) {
            // state.customerEmail = action.payload.customerEmail;
            // state.customerName = action.payload.customerName;
            // state.customerPhone = action.payload.customerPhone;

            state.customerEmail = action.payload.email;
            state.customerId = action.payload?._id;
            state.customerName = action.payload.name;
            state.customerPhone = action.payload.phone;
        },
        resetCustomer (state) {
            state.customerEmail = null;
            state.customerId = null;
            state.customerName = null;
            state.customerPhone = null;
        },
        openBooking(state) {
            state.showBooking = true;
        },
        setColor(state, action) {
            state.color = action.payload;
        }

    },
    extraReducers: builder => {
        builder
            .addCase(getCustomerByPhone.fulfilled, (state, action) => {
                state.customerEmail = action.payload.email;
                state.customerName = action.payload.name;
                state.customerPhone = action.payload.phone;
                state.customerId = action.payload._id;
            })
            .addCase(getCustomerByPhone.rejected, state => {

            })
            .addCase(createOrder.pending, state => {

            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.orderId = action.payload._id;
            } )
    }
});
export const {
    setBarber,
    setService,
    resetService,
    addAdditional,
    removeAdditional,
    setDateTime,
    removeDateTime,
    setCustomer,
    resetCustomer,
    openBooking,
    setColor
} = orderSlice.actions;
export const orderStore = orderSlice.reducer;
export default orderStore;