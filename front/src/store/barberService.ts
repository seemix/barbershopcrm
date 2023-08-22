import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { barberServiceService } from '../services/barberService.service';
import { IAdminBarberService, IBarberService, IUpdateBarberService } from '../interfaces/barber-service.model';

interface IInitialState {
    status: string | null;
    error: string | null;
    services: IBarberService[];
    barberServices: IAdminBarberService[];
    barberServiceForEdit: IAdminBarberService | null;
    barberServiceForCreate: IAdminBarberService | null;
    barberServiceModal: boolean;
}

const initialState: IInitialState = {
    services: [],
    barberServices: [],
    barberServiceModal: false,
    barberServiceForEdit: null,
    barberServiceForCreate: null,
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

export const updateBarberService = createAsyncThunk(
    'barberServiceSlice/UpdateBarberService',
    async (data: IUpdateBarberService, thunkAPI) => {
        try {
            return barberServiceService.updateBarberService(data);
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const createBarberService = createAsyncThunk(
    'barberServiceSlice/CreateBarberService',
    async (data: IUpdateBarberService, thunkAPI) => {
        try {
            return barberServiceService.createBarberService(data);
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const deleteBarberService = createAsyncThunk(
    'barberServiceSlice/DeleteBarberService',
    async (_id: string, thunkAPI) => {
        try {
            return barberServiceService.deleteBarberService(_id);
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
        setBarberServiceForCreate(state, action) {
            state.barberServiceForCreate = action.payload;
        },
        filterDeletedAdditionals(state, action) {
            // @ts-ignore
            state.barberServices = state.barberServices.map(item => {
                return {
                    ...item,
                    additionals: item.additionals.filter(add => add._id !== action.payload)
                };
            });
        }
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
            })
            .addCase(updateBarberService.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.error = null;
                const index = state.barberServices.findIndex(item => item._id === action.payload._id);
                state.barberServices[index].price = action.payload.price;
                state.barberServices[index].duration = action.payload.duration;
                state.barberServices[index].additionals = action.payload.additionals;
                state.barberServiceModal = false;
            })
            .addCase(createBarberService.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.error = null;
                state.barberServices = [...state.barberServices, action.payload];
                state.barberServiceForCreate = null;
                state.barberServiceModal = false;
            })
            .addCase(deleteBarberService.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.error = null;
                state.barberServices = state.barberServices.filter(item => item._id !== action.payload);
            });
    }
});
export const {
    openBarberServiceModal,
    closeBarberServiceModal,
    setBarberServiceForEdit,
    resetBarberServiceForEdit,
    setBarberServiceForCreate,
    filterDeletedAdditionals
} = barberServiceSlice.actions;
const barberServiceStore = barberServiceSlice.reducer;
export default barberServiceStore;