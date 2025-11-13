import { configDotenv } from "dotenv"
configDotenv({
    path:".env"
})
import express from "express"

const app = express()
const PORT = process.env.PORT || 8000


app.get("/",(req,res)=>{
    res.send("hello")
})

app.listen(PORT,()=>{
    console.log("server running ")
})