import express from "express";

import { getAllUsers, createUser, getUserInfoByID } from "../controllers/user.controllers";

const router = express.Router();

router.route('/').get(getAllUsers);
router.route('/').post(createUser);
router.route('/:id').get(getUserInfoByID);