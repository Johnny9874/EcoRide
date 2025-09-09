import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getAllUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                pseudo: true,
                reservations: {
                    select: {
                        id: true,
                        carpool: {
                            select: {
                                id: true,
                                from: true,
                                to: true,
                                date: true
                            }
                        }
                    }
                },
                vehicles: {
                    select: { id: true, brand: true, model: true }
                },
                preferences: true
            }
        });
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.params.id },
            select: {
                id: true,
                email: true,
                pseudo: true,
                reservations: {
                    select: {
                        id: true,
                        carpool: {
                            select: {
                                id: true,
                                from: true,
                                to: true,
                                date: true
                            }
                        }
                    }
                },
                vehicles: {
                    select: {
                        id: true,
                        brand: true,
                        model: true,
                        plate: true
                    }
                },
                preferences: true
            }
        });
        if (!user) return res.status(404).json({ error: 'Not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const createUser = async (req, res) => {
    try {
        const { email, pseudo, password } = req.body;
        const user = await prisma.user.create({ data: { email, pseudo, password } });
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { email, pseudo } = req.body;
        const updated = await prisma.user.update({
            where: { id: req.params.id },
            data: {email, pseudo}
        }).catch(() => null);

        if (!updated) return res.status(404).json({ error: 'User not found' });
        res.json(updated); 
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        await prisma.user.delete({ where: { id: req.params.id } });
        res.status(204).end();
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};