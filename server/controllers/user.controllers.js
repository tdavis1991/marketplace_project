import * as bcrypt from 'bcrypt';
import isEmail from 'validator/lib/isEmail.js';
import isStrongPassword from 'validator/lib/isStrongPassword.js';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

import User from '../mongodb/models/User.js';
import Item from '../mongodb/models/item.js'

dotenv.config();

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' });
};

// const getUserInfoByID = async (req, res) => {
//   try {
//     const { id } = req.params

//     const userExists = await User.findOne({ _id: id }).populate('inventory');

//     if(!userExists) throw new Error('User not found');

//     const inventory = [];

//     await userExists.inventory.map((item) => {
//       inventory.add(Item.findById({ _id }))
//     })

//     res.status(200).json(userExists, inventory);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

const getUserInfoByID = async (req, res) => {
  try {
    const { id } = req.params;

    const userExists = await User.findOne({ _id: id })

    if (!userExists) {
      throw new Error('User not found');
    }

    res.status(200).json({ userExists });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserInventory = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById({ _id: id }).populate('inventory');

    const inventory = user.inventory;

    const itemIds = inventory.map((item) => item._id)

    const inventoryItems = await Item.find({ _id: { $in: itemIds } });

    res.status(200).json({ inventoryItems })
  } catch (error) {
    res.status(500).json({ error: message.error })
  }
}

// authenticate 
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

     //validation
    if(!email || !password) {
      throw Error('All fields must be filled');
    }

    const user = await User.findOne({ email });

    const userId = user._id
    const avatar = user.avatar

    if(!user) {
      throw Error('Incorrect email');
    };

    const match = await bcrypt.compare(password, user.password);

    if(!match) {
      throw Error('Incorrect Password');
    }

    const token = createToken(user._id);
    console.log(user.avatar)

    // res.status(200).json({ message: 'User logged in!', email, token, avatar, userId });
    res.status(200).json({ message: 'User logged in!',user });
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
    const userId = user._id
    
    res.status(200).json({ email, token, userId });
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
};

export {
  getUserInfoByID,
  loginUser,
  signupUser,
  getUserInventory,
}

