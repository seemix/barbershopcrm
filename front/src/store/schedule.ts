import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ISchedule, IScheduleCreate, IScheduleUpdate } from '../interfaces/schedule-create';
import { scheduleService } from '../services/schedule.service';
import { ProcessedEvent } from '@aldabil/react-scheduler/types';

interface IInitialState {
    schedule: ISchedule[] | any;
    result: ProcessedEvent[];
    error: null | string;
    status: string | null;
    loading: boolean;
    scheduleModal: boolean;
    editEvent: any;
}

const initialState: IInitialState = {
    schedule: [],
    result: [],
    error: null,
    status: null,
    loading: false,
    scheduleModal: false,
    editEvent: null,
};

const processData = (data: any) => {
    //@ts-ignore
    return data.map(item => {
        return {
            event_id: item._id,
            start: new Date(item.startTime),
            end: new Date(item.endTime),
            admin_id: item.barber
        };
    });
};
export const getAllSchedules = createAsyncThunk(
    'scheduleSlice/getAllSchedules',
    async (_, thunkAPI) => {
        try {
            return scheduleService.getAllSchedules();
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);
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

export const updateSchedule = createAsyncThunk(
    'scheduleSlice/update',
    async (data: IScheduleUpdate, thunkAPI) => {
        try {
            return scheduleService.updateSchedule(data);
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const deleteSchedule = createAsyncThunk(
    'scheduleSlice/delete',
    async (id: string | number, thunkAPI) => {
        try {
            return scheduleService.deleteSchedule(id);
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);
const scheduleSlice = createSlice({
    name: 'scheduleSlice',
    initialState,
    reducers: {
        closeScheduleModal(state) {
            state.scheduleModal = false;
        },
        openScheduleModal(state, action) {
            state.editEvent = action.payload;
            state.scheduleModal = true;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(getScheduleByBarber.pending, state => {
                state.status = 'loading';
                state.error = null;
                state.loading = true;
                state.result = [];
            })
            .addCase(getScheduleByBarber.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.loading = false;
                state.error = null;
                state.result = processData(action.payload);
            })
            .addCase(getScheduleByBarber.rejected, (state, action) => {
                state.status = 'error';
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(createSchedule.pending, state => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(createSchedule.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.error = null;
                const resp = processData(action.payload);
                state.result = [...state.result, ...resp];
                state.scheduleModal = false;
            })
            .addCase(createSchedule.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.payload as string;
            })
            .addCase(updateSchedule.fulfilled, (state, action) => {
                const index = state.result.findIndex(item => item.event_id === action.payload._id);
                state.result[index] = {
                    title: '',
                    event_id: action.payload._id,
                    start: new Date(action.payload.startTime),
                    end: new Date(action.payload.endTime),
                    admin_id: action.payload.barber
                };
                state.scheduleModal = false;
            })
            .addCase(deleteSchedule.fulfilled, (state, action) => {
                state.result = state.result.filter(item => item.event_id !== action.payload);
                state.scheduleModal = false;
            })
            .addCase(getAllSchedules.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.error = null;
                state.result = processData(action.payload);
            });
    }
});
export const { openScheduleModal, closeScheduleModal } = scheduleSlice.actions;
const scheduleStore = scheduleSlice.reducer;
export default scheduleStore;
