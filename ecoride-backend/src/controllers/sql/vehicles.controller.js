import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getAllVehicles = async (req, res) => {
    try {
        const vehicles = await prisma.vehicle.findMany({
            include: {
                owner: {
                    select: {
                        id: true,
                        pseudo: true,
                        email: true
                    }
                }
            }
        });
        res.json(vehicles);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getVehicleById = async (req, res) => {
    try {
        const vehicle = await prisma.vehicle.findUnique({
            where: { id: req.params.id },
            include: { owner: {
                select: {
                    id: true,
                    pseudo: true,
                    email: true
                }
            }}
        });
        if (!vehicle) return res.status(404).json({ error: 'Not found' });
        res.json(vehicle)
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const createVehicle = async (req, res) => {
    try {
        const vehicle = await prisma.vehicle.create({ data: req.body });
        res.status(201).json(vehicle);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const updateVehicle = async (req, res) => {
    try {
        const updated = await prisma.vehicle.update({
            where: { id: req.params.id },
            data: req.body
        });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const deleteVehicle = async (req, res) => {
    try {
        await prisma.vehicle.delete({ where: { id: req.params.id } });
        res.status(204).end();
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};