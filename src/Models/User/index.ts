import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default:
      "https://ethereal-menu.s3.us-east-2.amazonaws.com/default/user/0d9cf5a5-5288-4f12-9c46-11795dc9d09c.jpeg",
  },
  password: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: function () {
      return new Date();
    },
  },
  updated_at: {
    type: Date,
    default: function () {
      return new Date();
    },
  },
  deleted_at: {
    type: Date,
    default: null,
  },
});

export const UserModel = mongoose.model("User", UserSchema);
