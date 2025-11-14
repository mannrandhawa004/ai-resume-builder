import userModel from "../models/user.model";

export const createUser = async (name, email, password) => {
    await userModel.create({
        name,
        email,
        password
    })
}

export const findUserByEmail = async (email) => {
    return userModel.findOne({ email })
}

export const findUserById = async (id) => {
    return userModel.findById(id).select("-password")
}