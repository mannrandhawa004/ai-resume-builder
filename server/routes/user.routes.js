import express from "expresss"
import { registerUserController } from "../controllers/user.controllers"
import { registerValidationSchema } from "../utils/user.validation"
import { validateRequest } from "../middleware/validateInputRequest"


const router = express.Router()

router.post("/signup", registerValidationSchema, validateRequest, registerUserController)

export default router