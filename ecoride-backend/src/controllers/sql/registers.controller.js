import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { createToken } from '../../utils/jwt.js'; // la fonction JWT que tu avais déjà

const prisma = new PrismaClient();

export const registersMiddleWare = async (req, res) => {
  const { email, password, role, pseudo } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ error: 'Email, mot de passe et rôle requis' });
  }

  try {
    // Vérifie si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Cet email est déjà utilisé' });
    }

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création de l'utilisateur
    const user = await prisma.user.create({
      data: {
        email,
        pseudo,
        password: hashedPassword,
        role
      }
    });

    // Génère un token JWT pour connecter direct l'utilisateur
    const token = createToken(user);

    res.status(201).json({ token, message: 'Inscription réussie !' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};
