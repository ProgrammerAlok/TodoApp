import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

// import { errorHandlerDev, errorHandlerProd } from './src/utils/globalErrorHandler.js';

// routes
import authRoute from '../routes/auth.route.js';
import todoRoute from '../routes/todo.route.js';

const app = express();

app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));
app.use(morgan("dev"));

app.get('/', (req, res) => {
    res.send("<h1> server is running <h1/>")
})

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/todo', todoRoute);

app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        status: err.status,
        err: err,
        message: err.message,
        stack: err.stack,
    });
});

export default app;