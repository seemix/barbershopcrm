import * as dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import cors from 'cors';

dotenv.config();
import mongoose from 'mongoose';

import config from './config.js';
import apiRouter from './routes/api.router.js';
import ApiError from './errors/api.error.js';

const app = express();
app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(apiRouter);

app.use((err: ApiError, req: Request, res: Response) => {
    res.status(err.status || 500).json({
        message: err.message || 'Unknown error',
        status: err.status || 500
    });
});

app.listen(config.PORT, () => {
    mongoose.connect(config.MONGO_URL).then(() => console.log('db connected')).catch((e) => console.log(e));
});