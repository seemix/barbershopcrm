import { createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '../services/auth.service';

interface IInitialState {
    auth: boolean | false;
    role: string | null;
    accessToken: string | null;
    refreshToken: string | null;
}

interface IParams {
    email: string;
    password: string;
}

const initialState: IInitialState = {
    accessToken: '',
    auth: false,
    refreshToken: '',
    role: ''
};

export const register = createAsyncThunk(
    'authSlice/register',
    async (params: IParams, thunkAPI) => {
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
    async (params: IParams, thunkAPI) => {
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
    async (params: IParams, thunkAPI) => {
        try {
           // return
        }catch (e) {

        }
    }
)