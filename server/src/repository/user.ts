import UserModel from "../models/user";

const defaultAvoidProject = {
    password: 0,
    __v: 0,
};

const userDataCatch = new Map<string, User | null>();

export async function getById(userId: string): Promise<User | null> {
    const catchKey = userId + "";
    if (userDataCatch.has(catchKey)) return userDataCatch.get(catchKey) || null;
    const userData = await UserModel.findOne({ _id: userId }, defaultAvoidProject);
    userDataCatch.set(catchKey, userData);
    return userData;
}

export async function getByEmail(email: string): Promise<User | null> {
    const catchKey = email + "";
    if (userDataCatch.has(catchKey)) return userDataCatch.get(catchKey) || null;
    const userData = await UserModel.findOne({ email: email }, defaultAvoidProject);
    userDataCatch.set(catchKey, userData);
    return userData;
}

export async function getByIdForPassword(userId: string): Promise<User | null> {
    return UserModel.findOne({ _id: userId });
}

export async function getByEmailForPassword(email: string): Promise<User | null> {
    return UserModel.findOne({ email: email });
}

export async function getAll(): Promise<User[]> {
    return UserModel.find({}, defaultAvoidProject);
}

export async function create(data: User): Promise<User> {
    const user = new UserModel(data);
    await user.save();
    return user;
}

const userRepository = {
    getById,
    getByEmail,
    getByIdForPassword,
    getByEmailForPassword,
    getAll,
    create,
};

export default userRepository;
