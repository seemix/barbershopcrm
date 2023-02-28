import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { freeSlotsService } from '../services/freeSlots.service';

interface IParam {
    barberId: string | null;
    duration: number | string;
}

export const getFreeSlots = createAsyncThunk(
    'slots/getFree',
    async (params: IParam, thunkAPI) => {
        try {
            const { barberId, duration } = params;
            return await freeSlotsService.getSlots(String(barberId), String(duration));
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    });

const getFreeSlotsSlice = createSlice({
    name: 'freeSlotsSlice',
    initialState: {
        freeSlots: [],
        status: '',
        error: null
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getFreeSlots.pending, state => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getFreeSlots.fulfilled, (state, action) =>{
                state.status = 'fulfilled';
                state.freeSlots = action.payload;
                state.error = null;
            })
    }
});

const freeSlotsStore = getFreeSlotsSlice.reducer;
export default freeSlotsStore;