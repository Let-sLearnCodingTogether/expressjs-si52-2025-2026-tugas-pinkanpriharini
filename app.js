import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./app_server/config/db.js";

dotenv.config(); // ⬅️ harus di atas sebelum connectDB()

import mahasiswaRoutes from "./app_server/routes/mahasiswaRoutes.js";
import konsumsiRoutes from "./app_server/routes/konsumsiRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Connect ke MongoDB
connectDB();

app.get("/", (req, res) => {
  res.send("Server Express aktif 🚀");
});

app.use("/api/mahasiswa", mahasiswaRoutes);
app.use("/api/konsumsi", konsumsiRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
