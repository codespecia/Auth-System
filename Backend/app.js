// Importing External Modules
import express from 'express';

// Importing Local Functions
import authRouter from './src/routes/authRoutes.js';

// Define Variables
const app = express();

// Define Middlewares
app.use(express.json());

// Define Auth Routes
app.use('/api/auth', authRouter);

// Exporting Functions
export default app;
