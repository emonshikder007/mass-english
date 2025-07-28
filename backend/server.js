import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import "dotenv/config";

// Routes
import userRoutes from "./routes/userRoute.js";
import adminRoutes from "./routes/adminRoute.js";
import videoRoutes from "./routes/videoRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

// DB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("DB Error:", err));

// ✅ FIXED CORS
const corsOptions = {
  origin: ["https://mass-english.onrender.com"], // ✅ no trailing slash
  credentials: true,
};
app.use(cors(corsOptions));

// ✅ FIXED JSON middleware
app.use(express.json());

// API Routes
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/", videoRoutes);

app.get("/", (req, res) => res.send("🚀 Server is Running"));

app.listen(PORT, () => console.log(`Server: http://localhost:${PORT}`));
