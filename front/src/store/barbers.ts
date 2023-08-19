import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBarber } from '../interfaces/barber.model';
import { barbersService } from '../services/barbers.service';

interface IInitState {
    barbers: IBarber[],
    error: string | null,
    status: string | null,
    currentBarber: IBarber | null
}

const initialState: IInitState = {
    barbers: [],
    error: null,
    status: '',
    currentBarber: null
};
export const getAllBarbers = createAsyncThunk(
    'barbersSlice/getAll',
    async (_, thunkAPI) => {
        try {
            return await barbersService.getAll;
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }

    });

export const getBarberById = createAsyncThunk(
    'barbersSlice/getById',
    async (_id: string, thunkAPI) => {
        try {
            return barbersService.getById(_id);
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);
export const barbersSlice = createSlice({
    name: 'barbersSlice',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getAllBarbers.pending, state => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getAllBarbers.fulfilled, (state, action: PayloadAction<IBarber[]>) => {
                state.status = 'fulfilled';
                state.error = null;
                state.barbers = action.payload;
            })
            .addCase(getAllBarbers.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.payload as string;
            })
            .addCase(getBarberById.fulfilled, (state, action) => {
                state.currentBarber = action.payload;
            });
    }
});
const barberStore = barbersSlice.reducer;
export default barberStore;