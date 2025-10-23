import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

// Import routes
import mahasiswaRoutes from "./app_server/routes/mahasiswaRoutes.js";
import konsumsiRoutes from "./app_server/routes/konsumsiRoutes.js";

// Konfigurasi
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connect
import connectDB from "./app_server/config/db.js";
connectDB();

// Routes
app.get("/", (req, res) => {
  res.send("Halo best! Server Express kamu udah aktif 🚀");
});

// Tambahkan routes ke server
app.use("/api/mahasiswa", mahasiswaRoutes);
app.use("/api/konsumsi", konsumsiRoutes);

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
