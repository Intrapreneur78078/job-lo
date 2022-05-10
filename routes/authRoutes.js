import express from "express"
const router = express.Router()
import authenticateUser from "../middleware/auth.js"
import { register, login, updateUser } from "../controllers/authController.js"

import rateLimiter from "express-rate-limit"
const apiLimiter = rateLimiter({
    windowMs:15*60*1000, //15min
    max:10,
    message:"Too many attempts. Please try again later"
})

router.route("/register").post(apiLimiter,register)
router.route("/login").post(apiLimiter,login)
router.route("/updateUser").patch(authenticateUser,updateUser)

export default router