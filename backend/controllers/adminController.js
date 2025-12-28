import adminModel from "../models/adminModel.js";
import videoModel from "../models/videoModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Create Token with admin role
const createToken = (id) => {
  return jwt.sign({ id, role: "admin" }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

//  Admin Login
export const loginAdmin = async (req, res) => {
  const { name, password } = req.body;

  try {
    const admin = await adminModel.findOne({ name });
    if (!admin) {
      return res.status(404).json({ success: false, message: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = createToken(admin._id);
    res.json({ success: true, token });
  } catch (err) {
    res.status(500).json({ success: false, message: "Login failed" });
  }
};


// Upload video
export const uploadVideo = async (req, res) => {
  const { title, category } = req.body;
  const file = req.file;

  try {
    const video = await videoModel.create({
      title,
      category,
      url: file.path
    });
    res.json({ success: true, video, message:"video uploaded" });
  } catch (err) {
    res.json({ success: false, message: "Upload failed" });
  }
};

// Get all videos
export const getAllVideos = async (req, res) => {
  try {
    const videos = await videoModel.find();
    res.json({ success: true, videos });
  } catch (err) {
    res.json({ success: false, message: "Failed to fetch videos" });
  }
};

// Delete a video
export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  try {
    await videoModel.findByIdAndDelete(id);
    res.json({ success: true, message: "Video deleted" });
  } catch (err) {
    res.json({ success: false, message: "Failed to delete video" });
  }
};
