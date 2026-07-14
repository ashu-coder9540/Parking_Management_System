import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Register API
export const register = async (req, res) => {
  try {
    const { userName, userEmail, userPassword } = req.body;

    // Check if user already exists
    const existing = await User.findOne({ userEmail}); 

    if (existing){
      return res.status(400).json({
        message: "User already exists",
      })
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
    res.status(500).json({
      message: "Internal Server Error",
    })
  }
};

// Login API
export const login = async (req, res) => {
    try{
      const { userEmail, userPassword } = req.body;

      // Check if user exists
      const user = await User.findOne({ userEmail });

      if(!user){
        return res.status(400).json({
          message: "User not found",
        })
      }
      // Compare the password
      const isPasswordValid = await bcrypt.compare(userPassword, user.userPassword);

      if(!isPasswordValid){
        return res.status(400).json({
          message: "Invalid Password",
        })
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
    }catch (error){
      res.status(500).json({
        message: "Internal Server error",
      })
    }
}