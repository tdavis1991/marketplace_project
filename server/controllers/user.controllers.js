import * as bcrypt from 'bcrypt';
import isEmail from 'validator/lib/isEmail.js';
import isStrongPassword from 'validator/lib/isStrongPassword.js'

import User from '../mongodb/models/User.js';

const getUserInfoByID = (req, res) => {};

// authenticate 
const loginUser= async (req, res) => {
  try {
    
    res.status(200).json({ message: 'User logged in!' })
  } catch (error) {
    
  }
};
const signupUser = async (req, res) => {
  try {
    const { name, email, password, avatar } = req.body

    //validation
    if(!email || !password) {
      throw Error('All fields must be filled');
    }

    if(!isEmail(email)){
      throw Error('Email is not valid');
    }

    if(!isStrongPassword(password)) {
      throw Error('Password not strong enough');
    }

    const exists = await User.findOne({ email });

    if(exists) {
      throw Error('Email already in use');
    };
    
    // hash passwoord
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
  
    const user = await User.create({
      name,
      email, 
      password: hash,
      avatar
    })
    
    res.status(200).json({ message: 'User signed in!', email, user });
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
};

export {
  getUserInfoByID,
  loginUser,
  signupUser,
}

