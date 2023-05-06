import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

import Item from '../mongodb/models/item.js';
import User from '../mongodb/models/User.js';


// Loads .env file contents into process.env
dotenv.config();

// setting up cloudinary config for photos
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

//CRUD operations
const getAllItems = async (req, res) => {
  try {
    const items = await Item.find()

    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
};

const getItemDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const itemExists = await Item.findOne({ _id: id }).populate('creator');

    if(!itemExists) throw new Error('Item not found');

    res.status(200).json(itemExists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createItem = async (req, res) => {
  try {
    const { title, description, price, category, photo, email } = req.body;

    const user = await User.findOne({ email });
    
    if(!user) throw new Error('User not found');
    
    // const photoUrl = await cloudinary.uploader.upload(photo)
    
    console.log(title, description, price, category, photo, email)
    const newItem = await Item.create({
      title,
      description,
      price,
      category,
      photo,
      creator: user._id,
    })

    user.inventory.push(newItem._id);

    await user.save();

    res.status(200).json({ message: 'Item posted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
};

const updateItem = async (req, res) => {
  try {
    const { id } = req.params

    const { title, description, price, category, photo } = req.body

    await Item.findByIdAndUpdate({ _id: id }, {
      title,
      description,
      price,
      category,
      photo,
    })
  
    res.status(200).json({ message: 'Item updated sucesfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
};

const deleteItem = async (req, res) => {
  try {
    const { id } = req.params

    const itemToDelete = await Item.findById({ _id: id }).populate('creator');

    if(!itemToDelete) throw new Error('Item not found');

    itemToDelete.creator.inventory.pull(itemToDelete);

    res.status(200).json({ message: 'Item deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.meaasge })
  }
};

export {
  getAllItems,
  getItemDetails,
  createItem,
  updateItem,
  deleteItem,
}