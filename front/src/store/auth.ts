import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authService } from '../services/auth.service';
import { IAuthUser } from '../interfaces/auth-user';
import { ILoginParams } from '../interfaces/login-params';

interface IInitialState {
    status: string;
    error: string | null;
    auth: boolean;
    user: IAuthUser;
    accessToken: string | null;
}


const initialState: IInitialState = {
    status: '',
    error: null,
    accessToken: '',
    auth: false,
    user: { name: '', role: '', id: '', barber: '' }
};

export const register = createAsyncThunk(
    'authSlice/register',
    async (params: ILoginParams, thunkAPI) => {
        try {
            const { email, password } = params;
            return await authService.register(email, password);
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const login = createAsyncThunk(
    'authSlice/login',
    async (params: ILoginParams, thunkAPI) => {
        try {
            const { email, password } = params;
            return await authService.login(email, password);
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const logout = createAsyncThunk(
    'authSlice/logout',
    async (_, thunkAPI) => {
        try {
            return await authService.logout();
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const checkAuth = createAsyncThunk(
    'authSlice/checkAuth',
    async (_, thunkAPI) => {
        try {
            return  await authService.checkAuth();
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(register.pending, state => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.error = null;
                state.user = action.payload.data.user;
            })
            .addCase(register.rejected, (state, action) => {
                state.error = action.payload as string;
            })
            .addCase(login.pending, state => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.error = null;
                state.accessToken = action.payload.data.accessToken;
                localStorage.setItem('token', state.accessToken);
                state.user = action.payload.data.user;
                state.auth = true;
            })
            .addCase(login.rejected, state => {
                state.status = 'error';
                state.error = 'ERROR';
            })
            .addCase(logout.pending, state => {
                state.status = 'loading';
            })
            .addCase(logout.fulfilled, state => {
                state.auth = false;
                state.user = {} as IAuthUser;
                localStorage.removeItem('token');
            })
            .addCase(logout.rejected, (state, action) => {
                state.error = action.payload as string;
            })
            .addCase(checkAuth.pending, state => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.error = null;
                state.status = 'fulfilled';
                state.error = null;
                localStorage.setItem('token', action.payload.data.accessToken);
                state.user = action.payload.data.user;
                state.auth = true;
            })

    }
});

const authStore = authSlice.reducer;
export default authStore;