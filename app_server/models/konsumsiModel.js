import mongoose from "mongoose";

const konsumsiSchema = new mongoose.Schema({
  namaPasien: { type: String, required: true },
  makanan: { type: String, required: true },
  kalori: { type: Number, required: true },
  tanggal: { type: Date, default: Date.now },
});

const Konsumsi = mongoose.model("Konsumsi", konsumsiSchema);

export default Konsumsi;