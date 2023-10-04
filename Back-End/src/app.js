import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import roleRoutes from './routes/role.routes.js'
import userRoutes from './routes/user.routes.js'

const app = express();

app.use(cors({
    credentials :  true, 
    origin: 'http://localhost:5173'
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use(roleRoutes);
app.use(userRoutes);

export default app;