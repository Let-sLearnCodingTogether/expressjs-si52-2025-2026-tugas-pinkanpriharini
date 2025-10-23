import express from "express";
import {
  getAllKonsumsi,
  createKonsumsi,
  updateKonsumsi,
  deleteKonsumsi,
} from "../controllers/konsumsiController.js";

const router = express.Router();

router.get("/", getAllKonsumsi);
router.post("/", createKonsumsi);
router.put("/:id", updateKonsumsi);
router.delete("/:id", deleteKonsumsi);

export default router; // ✅ penting! biar bisa di-import di app.js
