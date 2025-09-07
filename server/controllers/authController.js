import Account from "../models/Account.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const authController = {
  // Sign Up
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return res.status(400).json({ msg: "Please provide all fields" });
      }
      const existingUser = await Account.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ msg: "Email already in use" });
      }
      const user = await Account.create({
        name,
        email,
        password,
      });
      const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
      res.status(201).json({
        user: { name: user.name, email: user.email, role: user.role },
        token,
      });
    } catch (err) {
      res.status(500).json({ msg: "Server error", error: err.message });
    }
  },

  // Sign In
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ msg: "Please provide all fields" });
      }
      const user = await Account.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: "Invalid credentials" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid credentials" });
      }
      const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
      res.status(200).json({
        user: { name: user.name, email: user.email, role: user.role },
        token,
      });
    } catch (err) {
      res.status(500).json({ msg: "Server error", error: err.message });
    }
  },
};

export default authController;
