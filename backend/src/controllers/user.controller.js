import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import {
  loginValidation,
  registerValidation,
} from "../../utils/validators/user.validators.js";
import User from "../models/user.model.js";

dotenv.config();

// 📝 Register User
export const register = async (req, res) => {
  try {
    const { error } = registerValidation(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const { name, email, phone, password } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email or phone number already in use" });
    }

    // Create new user
    const newUser = new User({ name, email, phone, password });
    await newUser.save();

    res
      .status(201)
      .json({ message: "User registered successfully. Please log in." });
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "Email or phone number already exists" });
    }
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// 🔑 Login User
export const login = async (req, res) => {
  try {
    const { error } = loginValidation(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user)
      return res.status(401).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid email or password" });

    const token = user.generateAuthToken();

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};
