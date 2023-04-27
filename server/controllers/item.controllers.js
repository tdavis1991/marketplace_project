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
const getItemDetails = async (req, res) => {};
const createItem = async (req, res) => {
  try {
    const { title, description, price, category, photo } = req.body;

    const photoUrl = await cloudinary.uploader.upload(photo)

    const item = new Item({
      title,
      description,
      price,
      category,
      photo: photoUrl.url,
    })

    item.save();
    res.status(200).json({ message: 'Item posted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
};
const updateItem = async (req, res) => {};
const deleteItem = async (req, res) => {};

export {
  getAllItems,
  getItemDetails,
  createItem,
  updateItem,
  deleteItem,
}