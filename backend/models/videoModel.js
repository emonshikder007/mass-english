import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },

  url: {
    type: String,
    required: true,
  },

  uploadedAt: {
    type: Date,
    default: Date.now,
  },

  likes: {
    type: Number,
    default: 0,
  },
  likedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
      name: String,
      text: String,
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const videoModel =
  mongoose.models.video || mongoose.model("video", videoSchema);
export default videoModel;
