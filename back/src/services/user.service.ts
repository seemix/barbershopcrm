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
        const userData = await User.create({ email, password: hashedPassword, barber, role: process.env.USER_ROLE });
        const payload: IUserPayload = {
            id: String(userData._id),
            name: barber.name,
            role: String(userData.role),
            barber: String(barber._id)
        };
        return { ...payload };
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
        const barber = await Barber.findOne({ email });
        if (!barber) {
            throw new ApiError('Bad email or password', 401);
        }
        const userData: IUserPayload = {
            name: barber.name,
            id: String(user._id),
            role: String(user.role),
            barber: String(barber._id)
        };
        const tokens = tokenService.generateTokens(userData);
        await tokenService.saveToken(userData.id as string, tokens.refreshToken);
        return { ...tokens, user: userData };
    },
    logout: async (refreshToken: string) => {
        return await tokenService.removeToken(refreshToken);
    },
    refresh: async (refreshToken: string) => {
        if (!refreshToken) throw new ApiError('Authorization error', 401);
        const userData: any = await tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw new ApiError('Unauthorized', 401);
        }
        const { payload } = userData;
        const tokens = tokenService.generateTokens(payload);
        await tokenService.saveToken(String(payload.id), tokens.refreshToken);
        return { ...tokens, user: userData.payload };
    }
};