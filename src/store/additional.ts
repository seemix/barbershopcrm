import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { additionalService } from '../services/additional.service';
import { IAdditional } from '../models/additional.model';

interface IInitState {
    additionals: IAdditional[] | [],
    status: string;
    error: string | null;
}

interface IParams {
    barberId: string | null;
    serviceId: string | null;
}

const initialState: IInitState = {
    additionals: [],
    status: '',
    error: null
};

export const getAdditionalsByBarberAndService = createAsyncThunk(
    'additionalSlice/getByBarberAndService',
    async (params: IParams, thunkAPI) => {
        try {
            const { barberId, serviceId } = params;
            return await additionalService.getAdditionalByBarberAndService(barberId, serviceId);
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    });

const additionalSlice = createSlice({
    name: 'additionalSlice',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getAdditionalsByBarberAndService.fulfilled, (state, action: PayloadAction<IAdditional[]>) => {
                state.status = 'fulfilled';
                state.error = null;
                state.additionals = action.payload;
            });
    }
});

const additionalStore = additionalSlice.reducer;
export default additionalStore;
