import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import nodemailer from 'nodemailer';

import connectDB from './src/db/mongoose/mongoose.js';
import userRoutes from './src/routes/mongo/users_routes.js';
import carpoolRoutes from './src/routes/sql/carpools.routes.js';
import feedbacksRoutes from './src/routes/sql/feedbacks.route.js';
import preferencesRoutes from './src/routes/sql/preferences.route.js';
import reservationsRoutes from './src/routes/sql/reservations.route.js';
import usersRoutes from './src/routes/sql/users.route.js';
import vehiclesRoutes from './src/routes/sql/vehicles.route.js';
import loginsRoutes from './src/routes/sql/logins.route.js';
import registersRoutes from './src/routes/sql/registers.route.js';

dotenv.config();

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Serveur backend en cours sur http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error("❌ Erreur de connexion MongoDB :", err);
});

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.json()); // pour parser application/json

app.use('/api/users', userRoutes);
app.use('/api/sql/carpools', carpoolRoutes); 
app.use('/api/sql/feedbacks', feedbacksRoutes);
app.use('/api/sql/preferences', preferencesRoutes);
app.use('/api/sql/reservations', reservationsRoutes);
app.use('/api/sql/users', usersRoutes);
app.use('/api/sql/vehicles', vehiclesRoutes);
app.use('/api/sql/logins', loginsRoutes);
app.use('/api/sql/register', registersRoutes);

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",  // ton serveur SMTP
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      },
    });

    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: "ecoride.contact12@gmail.com",
      subject: "Nouveau message depuis la page Contact",
      text: message,
    });

    res.status(200).json({ message: "Message envoyé !" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors de l'envoi du message." });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Serveur backend en cours sur http://localhost:${PORT}`);
});