import connectDB from './mongoose.js';
import User from './models/User.js';

const run = async () => {
  await connectDB();

  // Exemple d'insertion d'un user test
  const user = new User({
    email: 'test@example.com',
    pseudo: 'TestUser',
  });

  try {
    const savedUser = await user.save();
    console.log('User inséré:', savedUser);
  } catch (error) {
    console.error('Erreur insertion user:', error);
  } finally {
    process.exit(0); // ferme le process après insertion
  }
};

run();