import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/db/mongoose/mongoose.js';
import userRoutes from './src/routes/mongo/users_routes.js';
import carpoolRoutes from './src/routes/sql/carpools.routes.js';
import feedbacksRoutes from './src/routes/sql/feedbacks.route.js';
import preferencesRoutes from './src/routes/sql/preferences.route.js';
import reservationsRoutes from './src/routes/sql/reservations.route.js';
import usersRoutes from './src/routes/sql/users.route.js';
import vehiclesRoutes from './src/routes/sql/vehicles.route.js';

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

app.use(express.json()); // pour parser application/json

app.use('/api/users', userRoutes);
app.use('/api/sql/carpools', carpoolRoutes); 
app.use('/api/sql/feedbacks', feedbacksRoutes);
app.use('/api/sql/preferences', preferencesRoutes);
app.use('/api/sql/reservations', reservationsRoutes);
app.use('/api/sql/users', usersRoutes);
app.use('/api/sql/vehicles', vehiclesRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Serveur backend en cours sur http://localhost:${PORT}`);
});
