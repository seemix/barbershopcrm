import jwt from 'jsonwebtoken';
import Token from '../models/token.js';
import { IUserPayload } from '../interfaces/user-payload.js';


export const tokenService = {
    generateTokens: (payload: IUserPayload) => {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET as string, { expiresIn: '10m' });
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET as string, { expiresIn: '30d' });
        return { accessToken, refreshToken };
    },
    saveToken: async (userId: string, refreshToken: string) => {
        const tokenData = await Token.findOne({ user: userId });
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        return await Token.create({ user: userId, refreshToken });
    },
    removeToken: async (refreshToken: string) => {
        return Token.deleteOne({ refreshToken });
    },
    validateAccessToken: async (accessToken: string) => {
        try {
            return jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET as string);
        } catch (e) {
            return null;
        }
    },
    validateRefreshToken: async (refreshToken: string) => {
        try {
            return jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET as string);
        } catch (e) {
            return null;
        }
    },
    findToken: async (refreshToken: string) => {
        return Token.findOne({ refreshToken });
    }

};