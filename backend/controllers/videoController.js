// controllers/videoController.js
import videoModel from "../models/videoModel.js";

// 🔥 Like a video
export const likeVideo = async (req, res) => {
  try {
    const video = await videoModel.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ success: false, message: "Video not found" });
    }

    const userId = req.user._id;

    // Check if user already liked
    if (video.likedBy.includes(userId)) {
      return res.status(400).json({ success: false, message: "You already liked this video" });
    }

    // Add like and user
    video.likes += 1;
    video.likedBy.push(userId);
    await video.save();

    res.json({ success: true, likes: video.likes });
  } catch (err) {
    console.error("Like error:", err);
    res.status(500).json({ success: false, message: "Like failed" });
  }
};

// 🔥 Comment on a video
export const commentOnVideo = async (req, res) => {
  try {
    console.log("Incoming comment...");
    console.log("req.user:", req.user);
    console.log("req.body:", req.body);
    console.log("req.params:", req.params);

    const { id } = req.params;
    const { text } = req.body;

    const video = await videoModel.findById(id);
    if (!video) {
      return res.status(404).json({ success: false, message: "Video not found" });
    }

    const comment = {
      user: req.user._id,
      name: req.user.name,
      text,
    };

    video.comments.push(comment);
    await video.save();

    res.status(200).json({ success: true, comments: video.comments });
  } catch (err) {
    console.error("💥 Comment Error:", err);
    res.status(500).json({ success: false, message: "Comment failed" });
  }
};
