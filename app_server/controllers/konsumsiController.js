import Konsumsi from "../models/konsumsiModel.js";

// All konsumsi endpoints are protected by auth middleware — req.user is expected

// GET semua data konsumsi milik user yang sedang login
export const getAllKonsumsi = async (req, res) => {
  try {
    const userId = req.user && req.user.id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });
    const konsumsi = await Konsumsi.find({ userId }).sort({ time: -1 });
    res.status(200).json(konsumsi);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE data konsumsi baru (will attach current user's id)
export const createKonsumsi = async (req, res) => {
  try {
    const userId = req.user && req.user.id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    // Prefer amountInMl/time for water consumption. Accept either shape.
    const payload = {
      userId,
      amountInMl: req.body.amountInMl || req.body.amount || null,
      time: req.body.time || req.body.tanggal || Date.now(),
      // keep legacy fields if provided
      namaPasien: req.body.namaPasien,
      makanan: req.body.makanan,
      kalori: req.body.kalori,
    };

    const konsumsiBaru = new Konsumsi(payload);
    const saved = await konsumsiBaru.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// UPDATE data konsumsi (only owner can update)
export const updateKonsumsi = async (req, res) => {
  try {
    const userId = req.user && req.user.id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const updated = await Konsumsi.findOneAndUpdate(
      { _id: req.params.id, userId },
      req.body,
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: 'Data tidak ditemukan atau tidak punya akses' });
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE data konsumsi (only owner can delete)
export const deleteKonsumsi = async (req, res) => {
  try {
    const userId = req.user && req.user.id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const deleted = await Konsumsi.findOneAndDelete({ _id: req.params.id, userId });
    if (!deleted) return res.status(404).json({ message: 'Data tidak ditemukan atau tidak punya akses' });

    res.status(200).json({ message: "Data konsumsi berhasil dihapus" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
