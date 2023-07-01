import express from "express";

import { getUserInfoByID, getUserInventory, loginUser, signupUser } from "../controllers/user.controllers.js";

const router = express.Router();

router.route('/:id').get(getUserInfoByID);
router.route('/:id/inventory').get(getUserInventory);


// authenticate
router.post('/login', loginUser);
router.post('/signup', signupUser);

export default router;

// User.find()
//   .populate('post')
//   .exec((err, users) => {
//     if (err) {
//       console.error(err);
//       return;
//     }
//     console.log(users);
//   });
