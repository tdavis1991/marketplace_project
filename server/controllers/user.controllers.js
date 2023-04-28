import * as bcrypt from 'bcrypt';
import isEmail from 'validator/lib/isEmail.js';
import isStrongPassword from 'validator/lib/isStrongPassword.js';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

import User from '../mongodb/models/User.js';

dotenv.config();

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' });
};

const getUserInfoByID = (req, res) => {};

// authenticate 
const loginUser= async (req, res) => {
  try {
    const { email, password } = req.body

     //validation
    if(!email || !password) {
      throw Error('All fields must be filled');
    }

    const user = await User.findOne({ email });

    if(!user) {
      throw Error('Incorrect email');
    };

    const match = await bcrypt.compare(password, user.password);

    if(!match) {
      throw Error('Incorrect Password');
    }

    const token = createToken(user._id);

    res.status(200).json({ message: 'User logged in!', email, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
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

    const token = createToken(user._id);
    
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
};

export {
  getUserInfoByID,
  loginUser,
  signupUser,
}

