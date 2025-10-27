const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Halo pinkan! Server Express kamu udah aktif 🚀');
});

module.exports = router;
