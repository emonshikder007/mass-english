import express from "express";
import { loginAdmin, uploadVideo, getAllVideos, deleteVideo } from "../controllers/adminController.js";
import { isAdminAuthenticated } from "../middleware/authMiddleware.js";
import multer from "multer";
import { storage } from "../utils/cloudinaryConfig.js";

const upload = multer({ storage }); // cloudinary file storage config
const router = express.Router();

// ✅ Admin Login (returns token)
router.post("/login", loginAdmin);

// ✅ Upload Video (protected by JWT token & multer file upload)
router.post("/upload", isAdminAuthenticated, upload.single("video"), uploadVideo);

// ✅ Get All Videos (public)
router.get("/videos", getAllVideos);

// ✅ Delete Video by ID (admin protected)
router.delete("/video/:id", isAdminAuthenticated, deleteVideo);

export default router;
