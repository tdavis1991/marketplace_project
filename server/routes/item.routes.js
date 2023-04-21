import express from 'express';

import { getAllItems, getItemDetails, createItem, updateItem, deleteItem } from '../controllers/item.controllers';

const router = express.Router();

router.route('/').get(getAllItems);
router.route('/:id').get(getItemDetails);
router.route('/').post(createItem);
router.route('/:id').patch(updateItem);
router.route('/:id').delete(deleteItem);

export default router;