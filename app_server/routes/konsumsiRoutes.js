import express from "express";
import {
  getAllKonsumsi,
  createKonsumsi,
  updateKonsumsi,
  deleteKonsumsi,
} from "../controllers/konsumsiController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// protect all konsumsi routes — user must be logged in and send Bearer <token>
router.use(authMiddleware);

router.get("/", getAllKonsumsi);
router.post("/", createKonsumsi);
router.put("/:id", updateKonsumsi);
router.delete("/:id", deleteKonsumsi);

export default router; // ✅ penting! biar bisa di-import di app.js
