import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { barberServiceService } from '../services/barberService.service';
import { IAdminBarberService, IBarberService } from '../interfaces/barber-service.model';

interface IInitialState {
    status: string | null;
    error: string | null;
    services: IBarberService[];
    barberServices: IAdminBarberService[];
    barberServiceForEdit: IAdminBarberService | null;
    barberServiceModal: boolean;
}

const initialState: IInitialState = {
    services: [],
    barberServices: [],
    barberServiceModal: false,
    barberServiceForEdit: null,
    status: null,
    error: null
};

export const getAllBarberServices = createAsyncThunk(
    'barberServiceSlice/GetByBarber',
    async (_, thunkAPI) => {
        try {
            return barberServiceService.getAllBarberServices();
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const getAdminBarberServices = createAsyncThunk(
    'barberServiceSlice/GetAdminBarberServices',
    async (_, thunkAPI) => {
        try {
            return barberServiceService.getAdminBarberServices();
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);
export const getServicesByBarber = createAsyncThunk(
    'barberServiceSlice/ServicesByBarber',
    async (barberId: string, thunkAPI) => {
        try {
            return await barberServiceService.getServicesByBarber(barberId);
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);
export const barberServiceSlice = createSlice({
    name: 'barberServiceSlice',
    initialState,
    reducers: {
        openBarberServiceModal(state) {
            state.barberServiceModal = true;
        },
        closeBarberServiceModal(state) {
            state.barberServiceModal = false;
        },
        setBarberServiceForEdit(state, action) {
            state.barberServiceForEdit = action.payload;
        },
        resetBarberServiceForEdit(state) {
            state.barberServiceForEdit = null;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(getAllBarberServices.fulfilled, (state, action) => {
                state.services = action.payload;
                state.status = 'fulfilled';
                state.error = null;
            })
            .addCase(getAdminBarberServices.fulfilled, (state, action) => {
                state.barberServices = action.payload;
                state.status = 'fulfilled';
                state.error = null;
            })
            .addCase(getServicesByBarber.fulfilled, (state, action) => {
                state.barberServices = action.payload;
            });
    }
});
export const { openBarberServiceModal, closeBarberServiceModal, setBarberServiceForEdit, resetBarberServiceForEdit } = barberServiceSlice.actions;
const barberServiceStore = barberServiceSlice.reducer;
export default barberServiceStore;