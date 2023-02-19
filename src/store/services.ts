import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { serviceService } from '../services/service.service';
import { IService } from '../models/service.model';
interface Iinitstate {
    services: IService[] | [],
    status: string;
    error: string | null;
}

const initialState: Iinitstate = {
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

const serviceSlice = createSlice({
    name: 'serviceSlice',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getServicesByBarber.fulfilled, (state, action:PayloadAction<IService[]>) => {
                state.status = 'fulfilled';
                state.error = null;
                state.services = action.payload;
            });
    }

});

const serviceStore = serviceSlice.reducer;
export default serviceStore;