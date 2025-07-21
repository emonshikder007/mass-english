import express from "express";
import { likeVideo, commentOnVideo } from "../controllers/videoController.js";
import { isUserAuthenticated } from "../middleware/authMiddleware.js";
const router = express.Router();

// ✅ Like route (user must be logged in)
router.post("/video/like/:id", isUserAuthenticated, likeVideo);

// ✅ Comment route (user must be logged in)
router.post("/video/comment/:id", isUserAuthenticated, commentOnVideo);

export default router;
