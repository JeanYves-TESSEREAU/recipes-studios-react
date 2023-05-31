import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  //   if we need give an access only for a defined time
  { timestamps: true }
);

const User = mongoose.model('user', UserSchema);
export default User;
