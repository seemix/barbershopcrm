import bcrypt from 'bcrypt';

import User from '../models/user.js';
import Barber from '../models/barber.js';
import ApiError from '../errors/api.error.js';
import { tokenService } from './token.service.js';
import { IUserPayload } from '../interfaces/user-payload.js';


export const userService = {
    register: async (email: string, password: string) => {
        const isRegistered = await User.findOne({ email });
        if (isRegistered) throw new ApiError('User is already registered', 400);
        const barber = await Barber.findOne({ email });
        if (!barber) throw new ApiError('No such barber in base', 400);
        const hashedPassword = await bcrypt.hash(password, 4);
        const userData = await User.create({ email, password: hashedPassword, barber, role: 'user' });
        const payload: IUserPayload = { id: String(userData._id), email: userData.email, role: String(userData.role) };
        const tokens = tokenService.generateTokens(payload);
        await tokenService.saveToken(payload.id as string, tokens.refreshToken);
        return { ...tokens, user: payload };
    },
    login: async (email: string, password: string) => {
        const user = await User.findOne({ email });
        if (!user) {
            throw new ApiError('Bad email or password', 401);
        }
        const equalPassword = await bcrypt.compare(password, user.password);
        if (!equalPassword) {
            throw new ApiError('Bad email or password', 401);
        }
        const userData: IUserPayload = { email: user.email, id: String(user._id), role: String(user.role) };
        const tokens = tokenService.generateTokens(userData);
        await tokenService.saveToken(userData.id as string, tokens.refreshToken);
        return { ...tokens, user: userData };
    },
    logout: async (refreshToken: string) => {
        return await tokenService.removeToken(refreshToken);
    },
    refresh: async (refreshToken: string) => {
        if (!refreshToken) throw new ApiError('Authorization error', 401);
        const userData = await tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw new ApiError('Unauthorized', 401);
        }
        const tokens = tokenService.generateTokens(userData as IUserPayload);
        await tokenService.saveToken(String((userData as IUserPayload).id), tokens.refreshToken);
        return { ...tokens, user: userData };

    }
};