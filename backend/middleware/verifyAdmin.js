// middlewares/verifyAdmin.js
import jwt from "jsonwebtoken";
import adminModel from "../models/adminModel.js";

const verifyAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await adminModel.findById(decoded.id);
    if (!admin) return res.status(403).json({ success: false, message: "Not authorized as admin" });
    req.admin = admin;
    next();
  } catch (err) {
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
};

export default verifyAdmin;
