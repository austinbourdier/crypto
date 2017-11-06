import mongoose from 'mongoose';

const CallSchema = new mongoose.Schema({
  exchange: String,
  ticker: String,
  target: Number,
  stopLoss: Number,
  created_at: { type: Date, default: Date.now },
});

export default mongoose.model('Call', CallSchema);
