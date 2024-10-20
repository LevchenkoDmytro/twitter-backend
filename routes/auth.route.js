import express from "express";
import { signup, login, logout, userInfo } from "../controllers/auth.controller.js";
import {protectRoute} from '../middleware/protectRoute.js'
const router = express.Router();

router.get('/userInfo', protectRoute ,userInfo)
router.post('/signup', signup) 
router.post('/login', login)
router.post('/logout', logout)

export default router;