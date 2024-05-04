import { Request, Response } from "express";
import userRepository from "../repository/user";
import password from "../services/password";
import jwt from "../services/jwt";
import authRepository from "../repository/auth";

export const singUpUser = async (req: Request, res: Response) => {
    const dataFromRequest = req.body;
    const userAgent = req.headers["user-agent"];
    const data: User = {};

    data.email = dataFromRequest?.email?.trim();
    data.password = dataFromRequest?.password?.trim();
    data.name = dataFromRequest?.name?.trim();

    if (!data?.name) throw utils.createError(400, "Name is required");
    if (!data?.email) throw utils.createError(400, "Email is required");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data?.email)) throw utils.createError(400, "Enter a valid email");
    if (!data?.password) throw utils.createError(400, "Password is required");

    const existingData = await userRepository.getByEmailForPassword(data?.email);

    if (existingData) throw utils.createError(400, "User with this email already exists");

    // create password hash from password
    data.password = password.createHash(data.password);

    //   save user data to db
    const userData = await userRepository
        .create(data)
        .catch(utils.throwInternalError("Error while creating user data"));

    // generate tokens
    const jwtToken = jwt.createJwtByUserId(userData._id as string);

    await authRepository
        .create({ uid: userData._id, userAgent, token: jwtToken })
        .catch(utils.throwInternalError("Error while logging user in"));

    const currentDate = new Date();
    const next12months = new Date(currentDate.setMonth(currentDate.getMonth() + 12));

    res.cookie("token", jwtToken, {
        httpOnly: true,
        secure: true,
        expires: next12months,
        sameSite: "none",
    });

    return {
        jwtToken,
    };
};
