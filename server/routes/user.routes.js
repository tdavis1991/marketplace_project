import express from "express";

import { getUserInfoByID, getUserInventory, loginUser, signupUser } from "../controllers/user.controllers.js";

const router = express.Router();

router.route('/:id').get(getUserInfoByID);
router.route('/:id').get(getUserInventory);


// authenticate
router.post('/login', loginUser);
router.post('/signup', signupUser);

export default router;