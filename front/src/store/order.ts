import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IOrder, IOrderState } from '../interfaces/order.model';
import { orderService } from '../services/order.service';
import dayjs from 'dayjs';


const initialState: IOrderState = {
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
    createdBy: '',
    orderEditModal: false,
    orderForEdit: null,
};

interface IAdditional {
    _id: string | '';
    price: number;
    duration: number;
}

const remapData = (data: any) => {
    //@ts-ignore
    return data.map(item => {
        return {
            event_id: item._id,
            title: item.service.name,
            start: dayjs(item.startTime).toDate(),
            end: dayjs(item.endTime).toDate(),
            service: item.service._id,
            admin_id: String(item.barber),
            color: item.color || '',
            customer: item.customer.name,
            phone: item.customer.phone,
            price: item.price,
            additional: item.additional.map((add: { _id: any; }) => {
                return add._id;
            }),
            add_names: item.additional,
            comment: item.comment,
            duration: dayjs(item.endTime).diff(dayjs(item.startTime), 'minutes'),
            customerId: item.customer._id
        };
    });
};
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
            return await orderService.getOrders();
        } catch (e) {
            thunkAPI.rejectWithValue(e);
        }
    }
);

export const deleteOrderById = createAsyncThunk(
    'order/DeleteById',
    async (orderId: string, thunkAPI) => {
        try {
            return orderService.deleteOrderById(orderId);
        } catch (e) {
            thunkAPI.rejectWithValue(e);
        }
    }
);

export const updateOrderById = createAsyncThunk(
    'order/UpdateById',
    async (order: any, thunkAPI) => {
        try {
            return orderService.updateOrderById(order);

        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const updateDateTime = createAsyncThunk(
    'order/UpdateDateTime',
    async (data: any, thunkAPI) => {
        try {
            return orderService.updateDateTime(data);
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
        resetAdditionals(state) {
            state.additionalServices = [];
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
            state.customerEmail = action.payload.customerEmail;
            state.customerId = action.payload._id;
            state.customerName = action.payload.customerName;
            state.customerPhone = action.payload.customerPhone;
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
            state.color = '#9e8a78';
            state.comment = '';
            state.createdBy = '';
        },
        setOrderForEdit(state, action) {
            state.barberId = action.payload.admin_id;
            state.customerId = action.payload.customerId;
            state.customerName = action.payload.customer;
            state.customerPhone = action.payload.phone;
            state.customerEmail = action.payload.email;
            state.serviceId = action.payload.service;
            state.additionalServices = action.payload.additional;
            state.startTime = dayjs(action.payload.start).toJSON();
            state.endTime = dayjs(action.payload.end).toJSON();
            state.price = action.payload.price;
            state.duration = action.payload.duration;
            state.orderId = action.payload.event_id;
            state.color = action.payload.color;
            state.comment = action.payload.comment;
            state.createdBy = '';
        },
        openOrderEditModal(state, action) {
            if (action.payload) {
                state.barberId = action.payload.admin_id;
                state.startTime = action.payload.start;
            }
            state.orderEditModal = true;
        },
        closeOrderEditModal(state) {
            state.orderEditModal = false;
            // state.orderForEdit = null;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(createOrder.fulfilled, (state, action) => {
                const newOrder = remapData([action.payload]);
                state.orders.push(newOrder[0]);
                state.orderEditModal = false;
            })
            .addCase(getOrdersForCalendar.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.error = null;
                state.orders = remapData(action.payload);
            })
            .addCase(updateOrderById.fulfilled, (state, action) => {
                const updatedOrder = remapData([action.payload]);
                const index = state.orders.findIndex(item => item.event_id === updatedOrder[0].event_id);
                state.orders[index] = updatedOrder[0];
                state.orderEditModal = false;
            })
            .addCase(deleteOrderById.fulfilled, (state, action) => {
                state.orders = state.orders.filter(order => order.event_id !== action.payload);
            })
            .addCase(updateDateTime.fulfilled, (state, action) => {
                const index = state.orders.findIndex(order => order.event_id === action.payload._id);
                state.orders[index] = {
                    ...state.orders[index],
                    start: dayjs(action.payload.startTime).toDate(),
                    end: dayjs(action.payload.endTime).toDate()
                };
            });
    }
});
export const {
    setBarber,
    setService,
    resetService,
    addAdditional,
    removeAdditional,
    resetAdditionals,
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
    setOrderForEdit,
    resetState,
    openOrderEditModal,
    closeOrderEditModal
} = orderSlice.actions;
export const orderStore = orderSlice.reducer;
export default orderStore;