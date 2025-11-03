import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/jwt.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signUp = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ fullName, email, password: hashedPassword });
    if (newUser) {
      const savedUser = await newUser.save();
      generateToken(savedUser._id, res);

      return res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      return res.status(500).json({ message: "Something went wrong" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


export const login = async (req,res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if(!user){
           return res.status(400).json({ message: "Invalid credentials" })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({ message: "Invalid credentials" })
        }
        generateToken(user._id, res)
        return res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: "Internal server error" })
    }
}

export const logout = (req,res) => {
    res.cookie("jwt","",{
        maxAge: 0
    })
    return res.status(200).json({ message: "Logout successful" })
}

export const updateProfile = async (req, res) => {
    const { profilePic } = req.body;
    if(!profilePic){
        return res.status(400).json({ message: "Profile picture is required" })
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(profilePic);
    const userId = req.user._id;
    const updatedUser = await User.findByIdAndUpdate(userId, { profilePic: cloudinaryResponse.secure_url }, { new: true });
    return res.status(200).json(updatedUser);
}