import mongoose from "mongoose";

// Updated schema: support water consumption (amountInMl, time) and keep older fields optional.
const konsumsiSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  // water consumption fields (preferred for this feature)
  amountInMl: { type: Number },
  time: { type: Date, default: Date.now },

  // legacy/other fields (kept optional to avoid breaking existing data)
  namaPasien: { type: String },
  makanan: { type: String },
  kalori: { type: Number },
  tanggal: { type: Date, default: Date.now },
});

const Konsumsi = mongoose.model("Konsumsi", konsumsiSchema);

export default Konsumsi;