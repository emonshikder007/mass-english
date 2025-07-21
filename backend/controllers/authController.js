import userModel from "../models/userModel.js";
import adminModel from "../models/adminModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import validator from "validator";

const createToken = (id, role = "user") => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// ----- User Registration -----
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const exists = await userModel.findOne({ email });
    if (exists) return res.json({ success: false, message: "User already exists" });

    if (!validator.isEmail(email)) return res.json({ success: false, message: "Invalid email" });
    if (password.length < 8) return res.json({ success: false, message: "Password too short" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await userModel.create({ name, email, password: hashedPassword });
    const token = createToken(newUser._id);

    return res.json({ success: true, token });
  } catch (err) {
    console.error(err);
    return res.json({ success: false, message: "Registration failed" });
  }
};

// ----- User Login -----
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) return res.json({ success: false, message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.json({ success: false, message: "Incorrect password" });

    const token = createToken(user._id);
    return res.json({ success: true, token });
  } catch (err) {
    console.error(err);
    return res.json({ success: false, message: "Login failed" });
  }
};

// ----- Admin Login -----
const loginAdmin = async (req, res) => {
  const { name, password } = req.body; // ✅ use 'name'

  try {
    const admin = await adminModel.findOne({ name }); // ✅ match 'name' field

    if (!admin) return res.json({ success: false, message: "Admin not found" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.json({ success: false, message: "Incorrect password" });

    const token = createToken(admin._id, "admin");
    return res.json({ success: true, token });
  } catch (err) {
    console.error(err);
    return res.json({ success: false, message: "Login failed" });
  }
};

export { registerUser, loginUser, loginAdmin };
