import express from 'express';

import { getAllItems, getItemDetails, getItemCategory, createItem, updateItem, deleteItem } from '../controllers/item.controllers.js';

const router = express.Router();

router.route('/').get(getAllItems);
router.route('/:id').get(getItemDetails);
router.route('/category/:id').get(getItemCategory);
router.route('/').post(createItem);
router.route('/:id').patch(updateItem);
router.route('/:id').delete(deleteItem);

export default router;