import express from "express";

import { getAllUsers, createUser, getUserInfoByID, loginUser, signupUser } from "../controllers/user.controllers.js";

const router = express.Router();

router.route('/').get(getAllUsers);
router.route('/').post(createUser);
router.route('/:id').get(getUserInfoByID);

// authenticate
router.post('/login', loginUser);
router.post('/signup', signupUser);

export default router;