import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { serviceService } from '../services/service.service';
import { IAllService, IService } from '../interfaces/service.model';

interface Iinitstate {
    services: IService[] | [],
    allServices: IAllService[],
    status: string;
    error: string | null;
}

const initialState: Iinitstate = {
    allServices: [],
    services: [],
    status: '',
    error: null
};

export const getServicesByBarber = createAsyncThunk(
    'servicesSlice/getByBarber',
    async (barberId: string, thunkAPI) => {
        try {
            return await serviceService.getServicesByBarber(barberId);
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const getAllServices = createAsyncThunk(
    'servicesSlice/GetAll',
    async (_, thunkAPI) => {
        try {
            return await serviceService.getALL();
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

const serviceSlice = createSlice({
    name: 'serviceSlice',
    initialState,
    reducers: {
        servicesReorder(state, action) {
            state.allServices = action.payload;
            return state;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getServicesByBarber.pending, (state, _) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getServicesByBarber.fulfilled, (state, action: PayloadAction<IService[]>) => {
                state.status = 'fulfilled';
                state.error = null;
                state.services = action.payload;
            })
            .addCase(getServicesByBarber.rejected, (state, action) => {
                state.error = action.payload as string;
            })
            .addCase(getAllServices.pending, state => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getAllServices.fulfilled, (state, action) => {
                state.allServices = action.payload;
                state.error = null;
                state.status = 'fulfilled';
            })
            .addCase(getAllServices.rejected, (state, action) => {
                state.error = action.payload as string;
                state.status = 'error';
            });

    }

});
export const { servicesReorder } = serviceSlice.actions;
const serviceStore = serviceSlice.reducer;
export default serviceStore;