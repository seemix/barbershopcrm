import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { additionalService } from '../services/additional.service';
import { IBarberAdditional } from '../interfaces/additional.model';
import { barberAdditionalService } from '../services/barberAdditional.service';


interface IInitialState {
    status: string | null;
    error: string | null;
    barberAdditionals: IBarberAdditional[],
    barberAddEditModal: boolean;
    barberAddForUpdate: IBarberAdditional | null;
    create: boolean;
}

const initialState: IInitialState = {
    status: null,
    error: null,
    barberAdditionals: [],
    barberAddEditModal: false,
    barberAddForUpdate: null,
    create: false
};

export const createBarberAdditional = createAsyncThunk(
    'barberAdditionalsSlice/create',
    async (data: IBarberAdditional, thunkAPI) => {
        try {
            return barberAdditionalService.create(data);
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);
export const getAdditionalsByBarber = createAsyncThunk(
    'barberAdditionalsSlice/getByBarber',
    async (barberId: string, thunkAPI) => {
        try {
            return await additionalService.getAdditionalsByBarber(barberId);
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    });

export const updateBarberAdditional = createAsyncThunk(
    'barberAdditionalsSlice/update',
    async (data: IBarberAdditional, thunkAPI) => {
        try {
            return additionalService.updateBarberAdditional(data);
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const barberAdditionalsSlice = createSlice({
    name: 'barberAdditionalsSlice',
    initialState,
    reducers: {
        openBarberAddModal(state) {
            state.barberAddEditModal = true;
        },
        closeBarberAddModal(state) {
            state.barberAddEditModal = false;
        },
        setBarberAddForUpdate(state, action) {
            state.barberAddForUpdate = action.payload;
        },
        setCreateBarberAdd(state) {
            state.create = true;
        },
        resetCreateBarberAdd(state) {
            state.create = false;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getAdditionalsByBarber.fulfilled, (state, action) => {
                state.barberAdditionals = action.payload;
            })
            .addCase(updateBarberAdditional.fulfilled, (state, action) => {
                const index = state.barberAdditionals.findIndex(item => item._id === action.payload._id);
                state.barberAdditionals[index].price = action.payload.price;
                state.barberAdditionals[index].duration = action.payload.duration;
                state.barberAddEditModal = false;
                state.barberAddForUpdate = null;
            })
            .addCase(createBarberAdditional.fulfilled, (state, action) => {
                state.barberAdditionals = [...state.barberAdditionals, action.payload];
                state.create = false;
                state.barberAddEditModal = false;
            });
    }
});

export const {
    openBarberAddModal, closeBarberAddModal, setBarberAddForUpdate, setCreateBarberAdd, resetCreateBarberAdd
} = barberAdditionalsSlice.actions;

const barberAdditionalStore = barberAdditionalsSlice.reducer;
export default barberAdditionalStore;