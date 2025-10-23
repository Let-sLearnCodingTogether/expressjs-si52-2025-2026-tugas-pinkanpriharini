import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Halo pinkan! Server Express kamu udah aktif 🚀');
});

export default router;
