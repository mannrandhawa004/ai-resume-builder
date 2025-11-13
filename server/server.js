import cookieParser from "cookie-parser"
import { configDotenv } from "dotenv"
configDotenv({
    path: ".env"
})
import express from "express"
import connectDB from "./configs/db.config.js"

const PORT = process.env.PORT || 8000
const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())



app.listen(PORT, async () => {
    await connectDB()
    console.log(`Server running on port ${PORT}`)
})