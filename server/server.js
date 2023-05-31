import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
dotenv.config();

import alimentRoutes from './routes/alimentRoutes.js';
import recipeRoutes from './routes/recipeRoutes.js';
import usersRoutes from './routes/usersRoutes.js';
import authRoutes from './routes/authRoutes.js';

const app = express();
connectDB();

app.use(express.json({ limit: '50mb', extended: false }));
app.use('/aliments', alimentRoutes);
app.use('/recipes', recipeRoutes);
app.use('/users', usersRoutes);
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server running on port${PORT}`));
