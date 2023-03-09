import * as dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
dotenv.config();
import mongoose from 'mongoose';

import config from './config.js';
import apiRouter from './routes/api.router.js';
import ApiError from './errors/api.error.js';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(express.urlencoded({ extended: true }));
app.use(apiRouter);

app.use((err: ApiError, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500).json({
        message: err.message || 'Unknown error',
        status: err.status || 500
    });
});


app.listen(config.PORT, () => {
    mongoose.connect(process.env.MONGO_URL as string).then(() => console.log('db connected')).catch((e) => console.log(e));
});