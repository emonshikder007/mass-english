import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import "dotenv/config";
import adminModel from "../models/adminModel.js";

const start = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("✅ Connected to MongoDB");

  const hashedPassword = await bcrypt.hash("admin1234", 10);

  try {
    await adminModel.create({
      name: "admin",
      password: hashedPassword,
    });

    console.log("✅ Admin Created Successfully");
    process.exit();
  } catch (err) {
    console.log("❌ Error Creating Admin:", err.message);
    process.exit(1);
  }
};

start();
