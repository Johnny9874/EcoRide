import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

// Permet de reconstruire __dirname dans un module ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Charge .env depuis la racine du projet
dotenv.config({ path: path.resolve(__dirname, '../../../../.env') });

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Atlas connecté !");
  } catch (error) {
    console.error("Erreur de connexion MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;
