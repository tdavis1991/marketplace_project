import express from "express";

import { getUserInfoByID, loginUser, signupUser } from "../controllers/user.controllers.js";

const router = express.Router();

router.route('/:id').get(getUserInfoByID);

// authenticate
router.post('/login', loginUser);
router.post('/signup', signupUser);

export default router;