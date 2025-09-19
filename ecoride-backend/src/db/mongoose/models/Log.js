import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  action: { type: String, required: true },
  details: { type: Object }, // tu peux mettre carpoolId, reservationId, etc.
  ip: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const Log = mongoose.model("Log", logSchema);
export default Log;