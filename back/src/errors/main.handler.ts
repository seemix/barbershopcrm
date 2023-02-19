import { Request, Response } from 'express';
import ApiError from './api.error.js';

export const error = (err: ApiError, req: Request, res: Response) => {
    res.status(err.status || 400).json(err.message || 'Server error' );
}