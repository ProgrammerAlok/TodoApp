import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import { errorHandlerDev, errorHandlerProd } from './utils/GlobalErrorHandler.js';

// routes
import authRoute from '../routes/auth.route.js';
import todoRoute from '../routes/todo.route.js';

const app = express();

app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin: [
        process.env.FRONTEND_URL,
        // 'http://localhost:5173',
    ],
    credentials: true,
}));
app.use(morgan("dev"));

app.get('/', (req, res) => {
    res.send("<h1> server is running... <h1/>")
})

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/todo', todoRoute);

if(process.env.NODE_ENV === 'development') {
    app.use(errorHandlerDev);
} else {
    app.use(errorHandlerProd);
}

export default app;