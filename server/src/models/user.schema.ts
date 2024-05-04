import { Schema } from "mongoose";

type userSchema = User;

const userSchema = new Schema(
  {
    name: String,
    email: String,
    phone: String,
    photoURL: String,
    password: String,
    age: Number,
    gender: String,
  },
  {
    timestamps: true,
  },
);

export default userSchema;
