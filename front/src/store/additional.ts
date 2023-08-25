import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { additionalService } from '../services/additional.service';
import { IAdd, IAdditional } from '../interfaces/additional.model';

interface IInitState {
    additionals: IAdditional[] | [],
    allAdditionals: IAdd[],
    status: string;
    error: string | null;
    addDialogOpen: boolean;
    deleteDialogOpen: boolean;
    additionalToDelete: string | null;
    additionalToUpdate: IAdd;
    reorderButton: boolean;
}

interface IParams {
    barberId: string | null;
    serviceId: string | null;
}

const initialState: IInitState = {
    additionals: [],
    allAdditionals: [],
    status: '',
    error: null,
    additionalToDelete: null,
    additionalToUpdate: { _id: '', name: '', order: 0 },
    deleteDialogOpen: false,
    addDialogOpen: false,
    reorderButton: false
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
    });

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
    async (arr: IAdd[], thunkAPI) => {
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
    reducers: {
        additionalsReorder(state, action) {
            state.allAdditionals = action.payload;
            state.reorderButton = true;
            return state;
        },
        closeAddDialog(state) {
            state.addDialogOpen = false;
            state.additionalToUpdate = { _id: '', name: '' };
        },
        openAddDialog(state) {
            state.addDialogOpen = true;
        },
        setAddToDelete(state, action) {
            state.deleteDialogOpen = true;
            state.additionalToDelete = action.payload;
        },
        setAddForUpdate(state, action) {
            state.additionalToUpdate = action.payload;
            state.addDialogOpen = true;
        },
        closeAddDeleteDialog(state) {
            state.deleteDialogOpen = false;
        }
    },
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
            })
            .addCase(getAllAdditionals.pending, state => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getAllAdditionals.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.error = null;
                state.allAdditionals = action.payload;
            })
            .addCase(getAllAdditionals.rejected, (state, action) => {
                state.error = action.payload as string;
                state.status = 'error';
            })
            .addCase(createAdditional.pending, state => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(createAdditional.fulfilled, (state, action) => {
                state.allAdditionals.push(action.payload);
                state.status = 'fulfilled';
                state.error = null;
                state.addDialogOpen = false;
            })
            .addCase(createAdditional.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.payload as string;
            })
            .addCase(deleteAdditional.pending, state => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(deleteAdditional.fulfilled, state => {
                state.status = 'fulfilled';
                state.allAdditionals = state.allAdditionals.filter(item => item._id !== state.additionalToDelete);
                state.error = null;
                state.deleteDialogOpen = false;
            })
            .addCase(deleteAdditional.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.payload as string;
            })
            .addCase(updateAdditional.pending, state => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(updateAdditional.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.payload as string;
            })
            .addCase(updateAdditional.fulfilled, state => {
                state.status = 'fulfilled';
                state.error = null;
                state.allAdditionals = state.allAdditionals.map(item => item._id === state.additionalToUpdate._id ? {
                    ...item,
                    name: state.additionalToUpdate.name,
                } : item);
                state.addDialogOpen = false;
                state.additionalToUpdate = { _id: '', name: '' };
            })
            .addCase(saveAdditionalOrder.fulfilled, state => {
                state.status = 'fulfilled';
                state.error = null;
                state.reorderButton = false;
            })
            .addCase(saveAdditionalOrder.pending, state => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(saveAdditionalOrder.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.payload as string;
            });
    }
});
export const {
    closeAddDeleteDialog,
    closeAddDialog,
    openAddDialog,
    setAddToDelete,
    setAddForUpdate,
    additionalsReorder
} = additionalSlice.actions;
const additionalStore = additionalSlice.reducer;
export default additionalStore;
