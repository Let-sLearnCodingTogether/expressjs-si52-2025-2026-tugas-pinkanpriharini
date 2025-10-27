const express = require('express');
const app = express();
const authRoutes = require('./app_server/routes/auth');
const { connectDB } = require('./app_server/config/db');

app.use(express.json());

// connect to database then start server
connectDB().then(async () => {
	// Gunakan rute auth
	app.use('/auth', authRoutes);

	// Mount API router (konsumsi, mahasiswa, etc.) which is written as ESM
	try {
		const apiModule = await import('./app_server/routes/api.js');
		const apiRouter = apiModule.default || apiModule;
		app.use('/api', apiRouter);
	} catch (err) {
		console.warn('Tidak dapat memuat api router secara dinamis:', err.message);
	}

	const PORT = process.env.PORT || 3000;
	app.listen(PORT, () => console.log(`Server berjalan di http://localhost:${PORT}`));
}).catch(err => {
	console.error('Gagal koneksi ke database, server tidak dijalankan.', err);
});
