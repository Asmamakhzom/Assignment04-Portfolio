import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import connectDB from "./db.js";
import User from "./models/User.js";

dotenv.config();

const seedAdmin = async () => {
  try {
    const { ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

    if (!ADMIN_NAME || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
      throw new Error("Admin details are missing from .env");
    }

    if (ADMIN_PASSWORD.length < 12) {
      throw new Error("Admin password must be at least 12 characters.");
    }

    await connectDB();

    const email = ADMIN_EMAIL.toLowerCase().trim();
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 12);

    let admin = await User.findOne({ email });

    if (admin) {
      admin.name = ADMIN_NAME;
      admin.password = hashedPassword;
      admin.role = "admin";
      await admin.save();

      console.log("Existing account updated as administrator.");
    } else {
      await User.create({
        name: ADMIN_NAME,
        email,
        password: hashedPassword,
        role: "admin"
      });

      console.log("Administrator account created successfully!");
    }

  } catch (error) {
    console.error("Admin setup failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
    console.log("MongoDB connection closed.");
  }
};

seedAdmin();