import { IAuthUser } from './auth-user';

export interface IAuthResponse {
    accessToken: string;
    refreshToken: string;
    user: IAuthUser;
}