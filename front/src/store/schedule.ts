import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ISchedule, IScheduleCreate } from '../interfaces/schedule-create';
import { scheduleService } from '../services/schedule.service';
import { ProcessedEvent } from '@aldabil/react-scheduler/types';

interface IInitialState {
    schedule: ISchedule[] | any;
    result: ProcessedEvent[];
    error: null | string;
    status: string | null;
    trigger: number;
}

const initialState: IInitialState = {
    schedule: [],
    result: [],
    error: null,
    status: null,
    trigger: 0,
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
            })
            .addCase(getScheduleByBarber.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.error = null;
                state.schedule = action.payload;
                // @ts-ignore
                state.result = action.payload.map(item => {
                    return {
                        event_id: item.event_id,
                        title: item.title,
                        start: new Date(item.start),
                        end: new Date(item.end),
                        color: item.color || ''
                    };
                });
            })
            .addCase(getScheduleByBarber.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.payload as string;
            })
            .addCase(createSchedule.pending, state => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(createSchedule.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.error = null;
                state.trigger = state.trigger +1;
                state.schedule = action.payload;
                // @ts-ignore
               // state.result = [];
            })
            .addCase(createSchedule.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.payload as string;
            });
    }
});

const scheduleStore = scheduleSlice.reducer;
export default scheduleStore;
