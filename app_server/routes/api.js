import express from 'express';
import mahasiswaRoutes from './mahasiswaRoutes.js';
import konsumsiRoutes from './konsumsiRoutes.js';

const router = express.Router();
router.use('/mahasiswa', mahasiswaRoutes);
router.use('/konsumsi', konsumsiRoutes);

export default router;
