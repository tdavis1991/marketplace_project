import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

import Item from '../mongodb/models/item.js';
import User from '../mongodb/models/User.js';


// Loads .env file contents into process.env.
dotenv.config();

//CRUD operations
const getAllItems = async (req, res) => {
  
};
const getItemDetails = async (req, res) => {};
const createItem = async (req, res) => {};
const updateItem = async (req, res) => {};
const deleteItem = async (req, res) => {};

export {
  getAllItems,
  getItemDetails,
  createItem,
  updateItem,
  deleteItem,
}