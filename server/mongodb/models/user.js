import mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  avatar: { type: String },
  inventory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
});

const userModel = mongoose.model('User', UserSchema);

export default userModel;