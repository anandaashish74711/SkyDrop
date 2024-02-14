// backend/controllers/authController.js

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys=require('../config/keys')

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name,email, password: hashedPassword });
    await user.save();
    
    // Omitting the password from the user object
    const userWithoutPassword = {
      name: user.name,
      _id: user._id,
      email: user.email,
      // Add any other fields you want to include in the response
    };
    const token = jwt.sign({ userId: user._id }, keys.jwtSecret, { expiresIn: '1h' });
    res.status(200).json({
      user: userWithoutPassword ,
      token
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign({ userId: user._id }, keys.jwtSecret, { expiresIn: '1h' });
    res.status(200).json({
      user: {
        name: user.name,
        _id: user._id,
        email: user.email,
      },
       token 
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
