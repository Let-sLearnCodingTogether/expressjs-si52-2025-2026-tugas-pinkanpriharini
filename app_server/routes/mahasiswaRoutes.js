import express from "express";
// mahasiswaController is CommonJS; import default and then pick properties
import mahasiswaController from "../controllers/mahasiswaController.js";

const router = express.Router();

const { getAll } = mahasiswaController;
router.get("/", getAll);

export default router;
