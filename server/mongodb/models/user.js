import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String },
  inventory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
});

// static signup method
UserSchema.static.signup = async (email, password) => {
  const exists = await userModel.findOne({ email })

  if(exists) {
    throw Error();
  }
}

const userModel = mongoose.model('User', UserSchema);

export default userModel;