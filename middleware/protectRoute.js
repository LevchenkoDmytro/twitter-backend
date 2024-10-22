import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'

export const protectRoute = async (req,res,next) => {
  try {
    const token = req.cookies.jwt
   
    console.log('ffff');
    console.log(token);
    console.log(req.cookies, 'все кукі');
    
    
    if(!token) {
      return res.status(401).json({error: 'You need to login first'})
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if(!decoded) {
      return res.status(401).json({error: "Unauthorized: Invalid Token"})
    }

    const user = await User.findById(decoded.userId).select("-password")

    if(!user) {
      return res.status(404).json({error: "User not found"})
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protecRouter middleware", error);
    return res.status(500).json({error: 'Server error'})
  }
}