import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

import Item from '../mongodb/models/item.js';
import User from '../mongodb/models/User.js';


// Loads .env file contents into process.env.
dotenv.config();

//CRUD operations
const getAllItems = (req, res) => {};
const getItemDetails = (req, res) => {};
const createItem = (req, res) => {};
const updateItem = (req, res) => {};
const deleteItem = (req, res) => {};

export {
  getAllItems,
  getItemDetails,
  createItem,
  updateItem,
  deleteItem,
}