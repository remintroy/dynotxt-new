import AuthModel from "../models/auth";

export async function create(data: AuthPayload): Promise<AuthPayload> {
    const dataCreated = new AuthModel(data);
    await dataCreated.save();
    return dataCreated;
}

export async function get(id: string): Promise<AuthPayload | null> {
    return AuthModel.findOne({ _id: id });
}

export async function getByJwt(jwtToken: string): Promise<AuthPayload | null> {
    return AuthModel.findOne({ token: jwtToken });
}

const authRepository = {
    get,
    getByJwt,
    create,
};

export default authRepository;
