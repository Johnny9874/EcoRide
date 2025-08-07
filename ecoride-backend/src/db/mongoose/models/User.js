import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  pseudo: { type: String, required: true },
  role: { type: String, enum: ['USER', 'EMPLOYEE', 'ADMIN'], default: 'USER' },
  credits: { type: Number, default: 20 },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);
export default User;