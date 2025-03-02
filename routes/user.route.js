import express from "express"
import { getUserSavedPosts, savePost,createUser,loginUser } from "../controllers/user.controller.js"

const router = express.Router()

router.get("/saved", getUserSavedPosts)
router.patch("/save", savePost)
router.post("/create-user",createUser)
router.post("/login",loginUser)

export default router 