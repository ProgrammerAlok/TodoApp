import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import { errorHandlerDev, errorHandlerProd } from './utils/globalErrorHandler.js';

// routes
import authRoute from './routes/auth.route.js';
import todoRoute from './routes/todo.route.js';

const app = express();

app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(morgan("dev"));

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/todo', todoRoute);

app.use(errorHandlerDev);

export default app;