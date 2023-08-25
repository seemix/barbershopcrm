import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { serviceService } from '../services/service.service';
import { IAllService, IService } from '../interfaces/service.model';

interface Iinitstate {
    services: IService[] | [],
    allServices: IAllService[],
    status: string;
    error: string | null;
    dialogOpen: boolean;
    deleteDialogOpen: boolean;
    serviceToDelete: string;
    serviceToUpdate: IAllService;
    reorderButton: boolean;
}

const initialState: Iinitstate = {
    allServices: [],
    services: [],
    status: '',
    error: null,
    dialogOpen: false,
    deleteDialogOpen: false,
    serviceToDelete: '',
    serviceToUpdate: { name: '', description: '' },
    reorderButton: false
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

export const getAllServices = createAsyncThunk(
    'servicesSlice/GetAll',
    async (_, thunkAPI) => {
        try {
            return await serviceService.getALL();
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);
export const saveOrder = createAsyncThunk(
    'servicesSlice/SaveOrder',
    async (arr: IAllService[], thunkAPI) => {
        try {
            return serviceService.saveOrder(arr);

        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);
export const createService = createAsyncThunk(
    'servicesSlice/CreateService',
    async (data: IAllService, thunkAPI) => {
        try {
            return serviceService.createService(data);
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);
export const deleteService = createAsyncThunk(
    'servicesSlice/DeleteService',
    async (_id: string, thunkAPI) => {
        try {
            return serviceService.deleteService(_id);
        } catch (e) {
            thunkAPI.rejectWithValue(e);
        }
    }
);
export const updateService = createAsyncThunk(
    'servicesSlice/UpdateService',
    async (data: IAllService, thunkAPI) => {
        try {
            return serviceService.updateService(data);
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);
const serviceSlice = createSlice({
    name: 'serviceSlice',
    initialState,
    reducers: {
        servicesReorder(state, action) {
            state.allServices = action.payload;
            state.reorderButton = true;
            return state;
        },
        closeDialog(state) {
            state.serviceToUpdate = {_id: '', name: '', description: ''}
            state.dialogOpen = false;
        },
        openDialog(state) {
            state.dialogOpen = true;
        },
        setDelete(state, action) {
            state.deleteDialogOpen = true;
            state.serviceToDelete = action.payload;
        },
        setServiceForUpdate(state, action) {
            state.serviceToUpdate = action.payload;
            state.dialogOpen = true;
        },
        closeDeleteDialog(state) {
            state.deleteDialogOpen = false;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getServicesByBarber.pending, (state, _) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getServicesByBarber.fulfilled, (state, action: PayloadAction<IService[]>) => {
                state.status = 'fulfilled';
                state.error = null;
                state.services = action.payload;
            })
            .addCase(getServicesByBarber.rejected, (state, action) => {
                state.error = action.payload as string;
            })
            .addCase(getAllServices.pending, state => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getAllServices.fulfilled, (state, action) => {
                state.allServices = action.payload;
                state.error = null;
                state.status = 'fulfilled';
            })
            .addCase(getAllServices.rejected, (state, action) => {
                state.error = action.payload as string;
                state.status = 'error';
            })
            .addCase(saveOrder.fulfilled, state => {
                state.status = 'fulfilled';
                state.error = null;
                state.reorderButton = false;
            })
            .addCase(saveOrder.pending, state => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(saveOrder.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.payload as string;
            })
            .addCase(createService.pending, state => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(createService.fulfilled, (state, action) => {
                state.allServices.push(action.payload);
                state.status = 'fulfilled';
                state.error = null;
            })
            .addCase(createService.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.payload as string;
            })
            .addCase(deleteService.pending, state => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(deleteService.fulfilled, state => {
                state.status = 'fulfilled';
                state.allServices = state.allServices.filter(service => service._id !== state.serviceToDelete);
                state.error = null;
                state.deleteDialogOpen = false;
            })
            .addCase(deleteService.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.payload as string;
            })
            .addCase(updateService.pending, state => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(updateService.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.payload as string;
            })
            .addCase(updateService.fulfilled, state => {
                state.status = 'fulfilled';
                state.error = null;
                state.allServices = state.allServices.map(item => item._id === state.serviceToUpdate._id ? {
                    ...item,
                    name: state.serviceToUpdate.name,
                    description: state.serviceToUpdate.description
                } : item);
                state.dialogOpen = false;
                state.serviceToUpdate = { _id: '', name: '', description: '' };
            });
    }
});
export const {
    servicesReorder,
    openDialog,
    closeDialog,
    setDelete,
    closeDeleteDialog,
    setServiceForUpdate
} = serviceSlice.actions;
const serviceStore = serviceSlice.reducer;
export default serviceStore;