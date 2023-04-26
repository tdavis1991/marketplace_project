import User from '../mongodb/models/User.js';

const getAllUsers = (req, res) => {};
const createUser = (req, res) => {};
const getUserInfoByID = (req, res) => {};
const loginUser = async (req, res) => {
  try {
    
    res.status(200).json({ message: 'User logged in' })
  } catch (error) {
    
  }
};
const signupUser = async (req, res) => {
  try {
    
    res.status(200).json({ message: 'User signed in' })
  } catch (error) {
    
  }
};


export {
  getAllUsers,
  createUser,
  getUserInfoByID,
  loginUser,
  signupUser,
};

