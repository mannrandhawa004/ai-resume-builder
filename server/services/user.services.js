import { createUser, findUserByEmail } from "../dao/user.dao"
import { AppError, conflictError } from "../utils/errorHandler"

export const registerUserService = async (name, email, password) => {
    const userAlreadyExists = await findUserByEmail(email)
    if (userAlreadyExists) throw new conflictError("User Already exists")

    const newUser = await createUser(name, email, password)
    if (!newUser) throw new AppError("User creation failed")

    return { newUser }

}