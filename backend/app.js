import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import { errorHandlerDev, errorHandlerProd } from './src/utils/globalErrorHandler.js';

// routes
import authRoute from './src/routes/auth.route.js';
import todoRoute from './src/routes/todo.route.js';

const app = express();

app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));
app.use(morgan("dev"));

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/todo', todoRoute);

app.use(errorHandlerDev);

export default app;