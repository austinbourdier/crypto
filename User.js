import mongoose from 'mongoose';
console.log('init')
const UserSchema = new mongoose.Schema({
  name: String,
  password: String,
  updated_at: { type: Date, default: Date.now },
});

export default mongoose.model('User', UserSchema);
