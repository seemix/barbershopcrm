import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IOrder } from '../interfaces/order.model';
import { orderService } from '../services/order.service';

const initialState: IOrder = {
    orders: [],
    error: null,
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

export const deleteOrderById = createAsyncThunk(
    'order/DeleteById',
    async (orderId: string | number, thunkAPI) => {
        try {
            return orderService.deleteOrderById(orderId);
        } catch (e) {
            thunkAPI.rejectWithValue(e);
        }
    }
);

export const updateOrderById = createAsyncThunk(
    'order/UpdateById',
    async (order: IOrder, thunkAPI) => {
        try {
            return orderService.updateOrderById(order);

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
        setEndTime(state, action) {
            state.endTime = action.payload;
        },
        removeDateTime(state) {
            state.startTime = null;
            state.endTime = null;
        },
        setCustomer(state, action) {
            state.customerEmail = action.payload.email;
            state.customerId = action.payload?._id;
            state.customerName = action.payload.name;
            state.customerPhone = action.payload.phone;
        },
        setCustomerPhone(state, action) {
            state.customerPhone = action.payload;
        },
        setCustomerName(state, action) {
            state.customerName = action.payload;
        },
        setCustomerEmail(state, action) {
            state.customerEmail = action.payload;
        },
        resetCustomer(state) {
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
        },
        setComment(state, action) {
            state.comment = action.payload;
        },
        resetState(state) {
            state.showBooking = false;
            state.barberId = null;
            state.customerId = null;
            state.customerName = null;
            state.customerPhone = null;
            state.customerEmail = null;
            state.serviceId = null;
            state.additionalServices = [];
            state.startTime = null;
            state.endTime = null;
            state.price = 0;
            state.duration = 0;
            state.orderId = null;
            state.status = 'new';
            state.color = '#9e8a78';
            state.comment = '';
            state.createdBy = '';
        }
    },
    extraReducers: builder => {
        builder
            .addCase(createOrder.pending, state => {

            })
            .addCase(createOrder.fulfilled, (state, action) => {

            })
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
                        phone: item.customer.phone,
                        additional: item.additional,
                        comment: item.comment
                    };
                });
            });
    }
});
export const {
    setBarber,
    setService,
    resetService,
    addAdditional,
    removeAdditional,
    setDateTime,
    setEndTime,
    removeDateTime,
    setCustomer,
    setComment,
    setCustomerEmail,
    setCustomerName,
    setCustomerPhone,
    resetCustomer,
    openBooking,
    setColor,
    resetState
} = orderSlice.actions;
export const orderStore = orderSlice.reducer;
export default orderStore;