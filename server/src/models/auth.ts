import { model } from "mongoose";
import authSchema from "./auth.schema";

const AuthModel = model<authSchema>("auths", authSchema);

export default AuthModel;
