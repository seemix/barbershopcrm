import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { barberServiceService } from '../services/barberService.service';
import { IBarberService } from '../interfaces/barber-service.model';

interface IInitialState {
    status: string | null;
    error: string | null;
    services: IBarberService[];
}

const initialState: IInitialState = {
    services: [],
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
export const barberServiceSlice = createSlice({
    name: 'barberServiceSlice',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getAllBarberServices.fulfilled, (state, action) => {
                state.services = action.payload;
                state.status = 'fulfilled';
                state.error = null;
            });
    }
});
const barberServiceStore = barberServiceSlice.reducer;
export default barberServiceStore;