import cookieParser from "cookie-parser"
import { configDotenv } from "dotenv"
configDotenv({
    path: ".env"
})
import express from "express"
import connectDB from "./configs/db.config.js"
import { Errohandler } from "./utils/errorHandler.js"
import userRoutes from "./routes/user.routes.js"
const PORT = process.env.PORT || 8000
const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
app.use(Errohandler)

app.use("/api/user", userRoutes)



app.listen(PORT, async () => {
    await connectDB()
    console.log(`Server running on port ${PORT}`)
})