// Importing External Modules
import bcryptjs from 'bcryptjs';

// Importing Local Functions
import User from '../models/userModel.js';
import { generateTokenAndSetCookie } from '../utils/jwtTokenUtils.js';

// Create & Exporting singup-controller Function
export const signup = async (req, res) => {
  // Extract request body data
  const { name, email, password } = req.body;

  // Validate Incoming Request Parameters
  try {
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    // Validate Email Format
    const isValidEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };
    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide valid details.',
      });
    }

    // Validate Existing User
    const userAlreadyExist = await User.findOne({ email });
    if (userAlreadyExist) {
      return res.status(400).json({
        success: false,
        message: 'User already exists',
      });
    }

    // Hashing Passowrd
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Create 6 Digit Verification Token
    const verificationToken = Math.floor(100000 + Math.random() * 900000);

    // Create Verification Expiry Time
    const verificationTokenExpiresAt = Date.now() + 24 * 60 * 60 * 1000;

    // Store & Saving User Data
    const user = new User({
      name,
      email,
      password: hashedPassword,
      verificationToken: verificationToken,
      verificationTokenExpiresAt: verificationTokenExpiresAt,
    });
    await user.save();

    // Calling jwtToken-Utils => generate-Token-And-SetCookie Function
    generateTokenAndSetCookie(res, user._id);

    // Sending Success Message
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isverified: user.isVerified,
        lastLogin: user.lastLogin,
      },
    });

    // Error Hangelling
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Create & Exporting login-controller Function
export const login = async (req, res) => {
  try {
    // Extract request body data
    const { email, password } = req.body;

    // Validate Incoming Request Parameters
    if ((!email, !password)) {
      return res.status(400).json({
        success: false,
        message: 'Enter your valid details',
      });
    }

    // Validate Correct Email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Enter your valid details',
      });
    }

    // Validate Correct Password
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: 'Enter your valid details',
      });
    }

    // Calling Utils ==> generateTokenAndSetCookie Function
    generateTokenAndSetCookie(res, user._id);

    // Set User Last Loggin Time
    user.lastLogin = Date.now();

    // Sending Success Message
    return res.status(200).json({
      success: true,
      message: 'You have logged in successfully',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isverified: user.isVerified,
        lastLogin: user.lastLogin,
      },
    });

    // Error Handelling
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal Server error ${error}`,
    });
  }
};

// Create & Exporting singout-controller Function
export const signout = async (req, res) => {
  try {
    // Clear Cookies & Sending Success Message
    await res.clearCookie('token');
    return res.status(200).json({
      success: true,
      message: 'User logged out successfully',
    });

    // Error Handelling
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal server error during Logout ${error}`,
    });
  }
};
