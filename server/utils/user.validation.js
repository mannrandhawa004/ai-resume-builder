import { body } from "express-validator"

export const registerValidationSchema = [
    body("name")
        .trim()
        .notEmpty().withMessage("Name should not be empty")
        .isLength({ min: 3 }).withMessage("name must be at least 3 characters")
        .isLength({ max: 50 }).withMessage("name must be smaller than 50 characters"),
    body("email")
        .trim()
        .notEmpty().withMessage("email is required")
        .isEmail().withMessage("invalid email format"),
    body("password")
        .trim()
        .notEmpty().withMessage("password is required")
        .isLength({ min: 6 }).withMessage("Password must be at least 6 charcters"),

]