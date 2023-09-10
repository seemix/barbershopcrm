import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { customerService } from '../services/customer.service';
import { ICustomerParams, ISingleCustomer } from '../interfaces/customer.model';

interface IInitialState {
    error: string | null;
    status: string | null;
    getCustomers: {
        customers: ISingleCustomer[],
        pages: number | null,
        page: number | null
    },
    customer: ISingleCustomer,
    customerForEdit: ISingleCustomer | null;
    customerEditModal: boolean;
    customerInfo: {
        _id?: string | null;
        createdAt: string | null;
        lastOrderPayed: number | null;
        lastOrderDate: string | null;
        allOrdersPayed: number | null;
        averageBill: number | null;
    },
    customerInfoModal: boolean;
}

const initialState: IInitialState = {
    customer: { _id: null, email: null, phone: null, name: null, tag: null },
    getCustomers: {
        customers: [],
        pages: null,
        page: null
    },
    error: null,
    status: null,
    customerEditModal: false,
    customerForEdit: null,
    customerInfoModal: false,
    customerInfo: {
        _id: null,
        lastOrderDate: null,
        allOrdersPayed: null,
        averageBill: null,
        createdAt: null,
        lastOrderPayed: null
    }
};

export const searchCustomers = createAsyncThunk(
    'customerSlice/Search',
    async (q: string, thunkAPI) => {
        try {
            return customerService.searchCustomers(q);
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);
export const getCustomerByPhone = createAsyncThunk(
    'customerSlice/getCustomerByPhone',
    async (phone: string | null, thunkAPI) => {
        try {
            return await customerService.getCustomerByPhone(phone);
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    });

export const getCustomerInfo = createAsyncThunk(
    'customerSlice/getCustomerInfo',
    async (_id: string, thunkAPI) => {
        try {
            return customerService.getCustomerInfo(_id);
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const getAllCustomers = createAsyncThunk(
    'customerSlice/GetAll',
    async (params: ICustomerParams, thunkAPI) => {
        try {
            return customerService.getAllCustomers(params);
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const createCustomer = createAsyncThunk(
    'customerSlice/CreateCustomer',
    async (customer: ISingleCustomer, thunkAPI) => {
        try {
            return customerService.createCustomer(customer);
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const updateCustomer = createAsyncThunk(
    'customerSlice/UpdateCustomer',
    async (customer: ISingleCustomer, thunkAPI) => {
        try {
            return {
                response: customerService.updateCustomer(customer),
                customer
            };
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);
export const deleteCustomer = createAsyncThunk(
    'customerSlice/DeleteCustomer',
    async (_id: string, thunkAPI) => {
        try {
            return customerService.deleteCustomer(_id);
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const customers = createSlice({
    name: 'customersSlice',
    initialState,
    reducers: {
        openCustomerEditModal(state) {
            state.customerEditModal = true;
        },
        closeCustomerEditModal(state) {
            state.customerEditModal = false;
        },
        setCustomerForEdit(state, action) {
            state.customerForEdit = action.payload;
            state.customerEditModal = true;
        },
        openCustomerInfoModal(state) {
            state.customerInfoModal = true;
        },
        closeCustomerInfoModal(state) {
            state.customerInfoModal = false;
        },
        setCustomer(state, action) {
            state.customer = action.payload;
        },
        resetCustomer(state) {
            state.customer = { _id: null, tag: null, email: null, name: null, phone: null };
        }
    },
    extraReducers: builder => {
        builder
            .addCase(searchCustomers.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.error = null;
                state.getCustomers.customers = action.payload.map((item: { name: string; phone: string; }) => {
                    return {
                        ...item,
                        label: item.name + ' (' + item.phone + ')'
                    };
                });
            })
            .addCase(getCustomerByPhone.fulfilled, (state, action) => {
                // state.customer.email = action.payload.email;
                // state.customer.name = action.payload.name;
                // state.customer.phone = action.payload.phone;
                // state.customer._id = action.payload._id;
                state.customer = action.payload;
                state.status = 'fulfilled';
            })
            .addCase(getAllCustomers.fulfilled, (state, action) => {
                state.getCustomers.customers = action.payload.customers;
                state.getCustomers.page = action.payload.page;
                state.getCustomers.pages = action.payload.pages;
            })
            .addCase(createCustomer.fulfilled, (state, action) => {
                state.getCustomers.customers = [action.payload, ...state.getCustomers.customers];
                state.customerEditModal = false;
            })
            .addCase(updateCustomer.fulfilled, (state, action) => {
                const index = state.getCustomers.customers.findIndex(customer => customer._id === action.payload.customer._id);
                state.getCustomers.customers[index] = action.payload.customer;
                state.customerEditModal = false;
            })
            .addCase(deleteCustomer.fulfilled, (state, action) => {
                state.getCustomers.customers = state.getCustomers.customers.filter(customer => customer._id !== action.payload);
            })
            .addCase(getCustomerInfo.fulfilled, (state, action) => {
                state.customerInfo = action.payload;
                state.customerInfoModal = true;
            });
    }
});

export const customersStore = customers.reducer;
export const {
    openCustomerEditModal,
    openCustomerInfoModal,
    setCustomerForEdit,
    closeCustomerEditModal,
    resetCustomer,
    setCustomer,
    closeCustomerInfoModal
} = customers.actions;
export default customersStore;