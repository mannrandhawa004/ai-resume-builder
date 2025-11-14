import { registerUserService } from "../services/user.services"
import { sucessResponse } from "../utils/global.response"


export const registerUserController = async (req, res, next) => {
    try {
        const { name, email, password } = req.body
        const { newUser } = await registerUserService(name, email, password)

        req.user = newUser
        return sucessResponse(res, "User created sucessfully", newUser, 201)

    } catch (error) {
        next(error)

    }

}