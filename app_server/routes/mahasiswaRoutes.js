import express from "express";
import { getMahasiswa } from "../controllers/mahasiswaController.js";

const router = express.Router();

router.get("/", getMahasiswa);

export default router;
