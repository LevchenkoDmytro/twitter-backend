import express from "express";
import authRoutes from './routes/auth.route.js'
import userRoutes from './routes/user.route.js'
import postsRoutes from './routes/posts.route.js'
import notificationRoutes from './routes/notification.route.js'
import connectMongoDB from './db/connectMongoDB.js'
import dotenv from "dotenv";
import cookieParser from 'cookie-parser'
import {v2 as cloudinary} from 'cloudinary'
import cors from 'cors'

dotenv.config() 

const app = express();
const PORT = process.env.PORT || 5000;


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  credentials: true 
}));

app.use(express.json({limit: '5mb'}))
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())


app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/notifications", notificationRoutes);
app.use('/', (req,res) => {
  res.send("Server is running")
})

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
  connectMongoDB()
})