const express = require('express');
const app = express();
const authRoutes = require('./app_server/routes/auth');

app.use(express.json());

// Gunakan rute auth
app.use('/auth', authRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server berjalan di http://localhost:${PORT}`));
