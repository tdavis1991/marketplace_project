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
    const { category, price, color } = req.body

    const filter = {
      category: category ? category : '',
      price: price ? price : '',
      color: color ? color : '',
    }

    const items = await Item.find();

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


// const getItemDetails = async (req, res) => {
//   try {
//     let { ids } = req.params; // Assuming 'ids' can be a single ID or an array of IDs

//     if (!Array.isArray(ids)) {
//       ids = [ids]; // Convert a single ID to an array with one element
//     }

//     const items = await Item.find({ _id: { $in: ids } }).populate('creator');

//     if (items.length === 0) {
//       throw new Error('Items not found');
//     }

//     res.status(200).json(items);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };



const getItemCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const itemCategory = await Item.find({ category: id })

    res.status(200).json(itemCategory);
  } catch (error) {
    res.status(500).json({ message: message.error });
  }
}

const createItem = async (req, res) => {
  try {
    const { title, description, price, rating, category, photo, email } = req.body;

    const user = await User.findOne({ email });
    
    if(!user) throw new Error('User not found');
    
    // const photoUrl = await cloudinary.uploader.upload(photo)
    
    // console.log(photoUrl)
    const newItem = await Item.create({
      title,
      description,
      price,
      rating,
      category,
      photo,
      numberOfRatings: 1,
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

    const { title, description, price, category, photo, rating } = req.body

    const updatedItem = await Item.findByIdAndUpdate({ _id: id }, {
        title,
        description,
        price,
        category,
        photo,
        $inc: { numberOfRating: 1 }
      },
      { new: true }
    )
  
    res.status(200).json({ message: 'Item updated sucesfully', updateItem })
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
  getItemCategory,
}