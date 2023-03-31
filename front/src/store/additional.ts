import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { additionalService } from '../services/additional.service';
import { IAdd, IAdditional } from '../interfaces/additional.model';
import { IAllService } from '../interfaces/service.model';

interface IInitState {
    additionals: IAdditional[] | [],
    status: string;
    error: string | null;
    dialogOpen: boolean;
    deleteDialogOpen: boolean;
    additionalToDelete: string | null;
    additionalToUpdate: IAdd | null;
}

interface IParams {
    barberId: string | null;
    serviceId: string | null;
}

const initialState: IInitState = {
    additionals: [],
    status: '',
    error: null,
    additionalToDelete: null,
    additionalToUpdate: null,
    deleteDialogOpen: false,
    dialogOpen: false
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

export const getAllAdditionals = createAsyncThunk(
    'additionalsSlice/GetAll',
    async (_, thunkAPI) => {
        try {
            return additionalService.getAllAdditionals();
        } catch (e) {
            thunkAPI.rejectWithValue(e);
        }
    }
);

export const createAdditional = createAsyncThunk(
    'additionalsSlice/CreateAdditional',
    async (data: IAdd, thunkAPI) => {
        try {
            return additionalService.createAdditional(data);
        } catch (e) {
            thunkAPI.rejectWithValue(e);
        }
    }
);

export const deleteAdditional = createAsyncThunk(
    'servicesSlice/DeleteService',
    async (_id: string, thunkAPI) => {
        try {
            return additionalService.deleteAdditional(_id);
        } catch (e) {
            thunkAPI.rejectWithValue(e);
        }
    }
);

export const updateAdditional = createAsyncThunk(
    'servicesSlice/UpdateService',
    async (data: IAdd, thunkAPI) => {
        try {
            return additionalService.updateAdditional(data);
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const saveAdditionalOrder = createAsyncThunk(
    'servicesSlice/SaveOrder',
    async (arr: IAllService[], thunkAPI) => {
        try {
            return additionalService.saveAdditionalOrder(arr);

        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);
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
            })
            .addCase(getAdditionalsByBarberAndService.pending, state => {
                state.status = 'loading';
                state.error = null;
            });
    }
});

const additionalStore = additionalSlice.reducer;
export default additionalStore;
