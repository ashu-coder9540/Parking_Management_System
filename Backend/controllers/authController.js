import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";

// Register API
export const register = async (req, res, next) => {
  try {
    const { userName, userEmail, userPassword } = req.body;

    // Check if user already exists
    const existing = await User.findOne({ userEmail}); 

    if (existing){
      throw new ApiError(400, "User already exists");
    }
    // If not exists, then hash the password and create a new user
    const hashedPassword = await bcrypt.hash(userPassword, 10);

    const user  = await User.create({
      userName, 
      userEmail, 
      userPassword: hashedPassword,
    })

    res.status(201).json({
      message: "User registered Successfully",
    })

  } catch (error){
    next(error);
  }
};

// Login API
export const login = async (req, res, next) => {
    try{
      const { userEmail, userPassword } = req.body;

      // Check if user exists
      const user = await User.findOne({ userEmail });

      if(!user){
        throw new ApiError(400, "User not found");
      }
      // Compare the password
      const isPasswordValid = await bcrypt.compare(userPassword, user.userPassword);

      if(!isPasswordValid){
        throw new ApiError(400, "Invalid Password");
      }
      // Generate JWT token
      const token = jwt.sign(
        {
          Id: user._id,
          Role: user.userRole,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );
      res.status(200).json({
        message: "Login Successful",
        token,
        user: {
          userName: user.userName,
          userEmail: user.userEmail,
        }
      });
    } catch (error){
      next(error);
    }
}