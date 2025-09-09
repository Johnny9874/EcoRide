import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getAllPreference = async (req, res) => {
    try {
        const preferences = await prisma.preference.findMany({
            include: {
                driver: {
                    select: {
                        id: true,
                        email: true,
                        pseudo: true
                    }
                }
            }
        });
        res.json(preferences);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getPreferenceById = async (req, res) => {
    try {
        const preference = await prisma.preference.findUnique({
            where: { id: req.params.id },
            include: {
                driver: {
                    select: {
                        id: true,
                        email: true,
                        pseudo: true
                    }
                }
            }
        });
        if (!preference) return res.status(404).json({ error: 'Not found' });
        res.json(preference);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const createPreference = async (req, res) => {
    try {
        const preference = await prisma.preference.create({ data: req.body });
        res.status(201).json(preference);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const updatePreference = async (req, res) => {
    try {
        const updated = await prisma.preference.update({
            where: { id: req.params.id },
            data: req.body
        })
        res.json(updated)
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const deletePreference = async (req, res) => {
    try {
        await prisma.preference.delete({ where: { id: req.params.id } });
        res.status(204).end();
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};