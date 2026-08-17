import dotenv from "dotenv"
dotenv.config()
import express from "express"
import connectDB from "./database/connectDB.js"
import cors from "cors"
import cookieParser from "cookie-parser"
import MemberRoute from "./routes/member.route.js"
import OwnerRoute from "./routes/owner.route.js"


const app = express()


// database connecting
connectDB()


// middlewares
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(cookieParser())
app.use(express.json())


// routes 
app.use("/member", MemberRoute)
app.use("/owner", OwnerRoute)



// basic route
app.get("/", (req ,res)=>{
    res.send("One 5 Workspace")
})


// port and listening server
const PORT = process.env.PORT || 2005
app.listen(PORT,()=>{
    console.log(`Server : http://localhost:${PORT}`);
})
