// Importing External Modules
import 'dotenv/config';

//Importing Local Functions
import connectDB from './src/config/dbConfig.js';
import app from './app.js';

// Define Variables
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'production';

// Define Basic Routes
app.get('/', (req, res) => {
  try {
    res.status(200).json({
      success: true,
      route: 'Home or /',
      message: 'Basic express server is running well',
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Creating Express Server
app.listen(PORT, () => {
  connectDB();
  console.log(`Server launched on port ${PORT} in ${NODE_ENV} mode.`);
});
