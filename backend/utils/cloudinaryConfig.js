import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


export const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "english-academy-videos",
    resource_type: "video",
    format: async (req, file) => "mp4",
  },
});

//  Multer setup with large file size
export const upload = multer({
  storage,
  limits: { fileSize: 500 * 1024 * 1024 }, // 500MB limit
});
