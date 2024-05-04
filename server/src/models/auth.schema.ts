import { Schema } from "mongoose";

type authSchema = AuthPayload;

const authSchema = new Schema(
  {
    uid: String,
    token: String,
    userAgent: String,
  },
  {
    timestamps: true,
  },
);

export default authSchema;
