import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import roleRoutes from './routes/role.routes.js'
import userRoutes from './routes/user.routes.js'
import productRoutes from './routes/product.routes.js'
import recipeRoutes from './routes/recipe.routes.js'
import category_suppliesRoutes from './routes/category_supplies.routes.js';
import category_productsRoutes from './routes/category_products.routes.js'
import suppliesRoutes from '../src/routes/supplies.routes.js';

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
app.use(productRoutes);
app.use(recipeRoutes);
app.use(category_suppliesRoutes);
app.use(category_productsRoutes);
app.use(suppliesRoutes);

export default app;