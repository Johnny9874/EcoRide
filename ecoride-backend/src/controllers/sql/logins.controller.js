import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { createToken } from '../../utils/jwt.js'; // ta fonction createToken que tu avais déjà

const prisma = new PrismaClient();

export const loginUser = async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ error: 'Email, mot de passe et rôle requis' });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) return res.status(401).json({ error: 'Utilisateur non trouvé' });

    // Vérifie le mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Mot de passe incorrect' });

    // Vérifie le rôle choisi
    if (user.role !== role) return res.status(403).json({ error: 'Rôle incorrect' });

    // Génère un JWT
    const token = createToken(user);

    res.json({ token, message: 'Connexion réussie' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};
