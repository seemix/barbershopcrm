import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ISchedule, IScheduleCreate } from '../interfaces/schedule-create';
import { scheduleService } from '../services/schedule.service';

interface IInitialState {
    schedule: ISchedule[] | any;
    error: null | string;
    status: string | null;
    loading: boolean;
}

const initialState: IInitialState = {
    schedule: [],
    error: null,
    status: null,
    loading: false
};

export const getScheduleByBarber = createAsyncThunk(
    'scheduleSlice/getByBarber',
    async (barberId: string, thunkAPI) => {
        try {
           return scheduleService.getScheduleByBarber(barberId);
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const createSchedule = createAsyncThunk(
    'scheduleSlice/create',
    async (data: IScheduleCreate, thunkAPI) => {
        try {
            return scheduleService.createSchedule(data);
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);
const scheduleSlice = createSlice({
    name: 'scheduleSlice',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getScheduleByBarber.pending, state => {
                state.status = 'loading';
                state.error = null;
                state.loading = true;
            })
            .addCase(getScheduleByBarber.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.error = null;
                state.schedule = action.payload;
                state.loading = false;
            })
            .addCase(getScheduleByBarber.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.payload as string;
                state.loading = false;
            })
            .addCase(createSchedule.pending, state => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(createSchedule.fulfilled, state => {
                state.status = 'fulfilled';
                state.error = null;
            })
            .addCase(createSchedule.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.payload as string;
            });
    }
});

const scheduleStore = scheduleSlice.reducer;
export default scheduleStore;
