import { Router } from "express";
import makeExpressCallback from "../middlewares/makeExpressCallback";
import { singUpUser } from "../controllers/user";

const userRouter = Router();

userRouter.post("/", makeExpressCallback(singUpUser));

export default userRouter;
