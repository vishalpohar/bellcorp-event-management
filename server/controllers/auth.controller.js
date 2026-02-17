import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/**
 * @desc    Register new user
 * @route   POST /api/auth/register
 * @access  Public
 */
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const validateEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    const validatePassword =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]{8,}$/;

    if (!validateEmail.test(email.toLowerCase())) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    if (!validatePassword.test(password)) {
      return res.status(400).json({
        message:
          "Password must be 8+ characters, include uppercase, lowercase, number and special character",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log("Error occurred while registering", error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Login user
 * @route   POST /api/auth/login
 * @access  Public
 */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    const isPassword = await bcrypt.compare(password, user.password);

    if (!isPassword)
      return res.status(400).json({ message: "Invalid email or password" });

    const payload = {
      userId: user._id,
    };

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "1d"});
    const userData = { name: user.name, email: user.email };

    res.json({
      message: "Login successful",
      user: userData,
      token: accessToken,
    });
  } catch (error) {
    console.log("Error occurred while login", error);
    res.status(500).json({ message: error.message });
  }
};
