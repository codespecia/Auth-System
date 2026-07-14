// Importing External Modules
import express from 'express';

// Importing Local Functions
import { signup, login, signout } from '../controllers/authController.js';

// Define Variables
const authRouter = express.Router();

// Creating Singup Route
authRouter.post('/signup', signup);

// Creating Login Route
authRouter.post('/login', login);

// Creating Signout Route
authRouter.post('/signout', signout);

// Exporting Functions
export default authRouter;
