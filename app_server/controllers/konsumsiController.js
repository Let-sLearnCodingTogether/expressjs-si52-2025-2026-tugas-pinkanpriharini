import Konsumsi from "../models/konsumsiModel.js";

// GET semua data konsumsi
export const getAllKonsumsi = async (req, res) => {
  try {
    const konsumsi = await Konsumsi.find();
    res.status(200).json(konsumsi);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE data konsumsi baru
export const createKonsumsi = async (req, res) => {
  const konsumsiBaru = new Konsumsi(req.body);
  try {
    const saved = await konsumsiBaru.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// UPDATE data konsumsi
export const updateKonsumsi = async (req, res) => {
  try {
    const updated = await Konsumsi.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE data konsumsi
export const deleteKonsumsi = async (req, res) => {
  try {
    await Konsumsi.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Data konsumsi berhasil dihapus" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
