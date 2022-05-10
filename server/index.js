//Importing Libraries
import express from "express"
import "express-async-errors"
import "dotenv/config"
import cors from "cors"
import morgan from "morgan"

//Security imports
import helmet from "helmet"
import xss from "xss-clean"
import mongoSanitize from "express-mongo-sanitize"

//Deployment related imports
import { dirname } from "path"
import { fileURLToPath } from "url"
import path from "path"

//Importing functions
import connectDB from "./db/connect.js"

//Initializing
const app = express()

//Middleware
if(process.env.NODE_ENV !== "production"){
    app.use(morgan("dev"))
}
app.use(express.json())
app.use(cors({
    credentials:true,
    origin:["http://localhost:3000"]
}))
app.use(helmet())
app.use(xss())
app.use(mongoSanitize())
//We will use proxy in frontend instead of cors in server
//Remember! proxy works in dev mode only

app.get("/api/v1/",(req,res)=>{
    res.json("Hi")
})

//Only when ready to deploy
const __dirname = dirname(fileURLToPath(import.meta.url))
app.use(express.static(path.resolve(__dirname,'../client/build')))

//Route Middleware
import authRouter from "./routes/authRoutes.js"
import jobsRouter from "./routes/jobsRoutes.js"
//Auth Middleware
import authenticateUser from "./middleware/auth.js"
app.use("/api/v1/auth",authRouter)
app.use("/api/v1/jobs",authenticateUser,jobsRouter)
//
app.get('*' ,(req,res)=>{
    res.sendFile(path.resolve(__dirname,'../client/build','index.html'))
})

//Error Handling Middleware
import errorHandlerMiddleware from "./middleware/error-handler.js"
import notFoundMiddleware from "./middleware/not-found.js"
//Responds to routes which doesn't exist
app.use(notFoundMiddleware)
//Respond with error in existing routes
app.use(errorHandlerMiddleware)

//Starting Server
const port = process.env.PORT || 3001 ; 
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port,()=>{
            console.log(`Server is running on port ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}
start()