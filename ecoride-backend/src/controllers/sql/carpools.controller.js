import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getAllCarpools = async (req, res) => {
  try {
    const carpools = await prisma.carpool.findMany({
      include: { 
        driver: {
            select : { id: true, email: true, pseudo: true }
        }, 
        vehicle: true 
        }
    });
    res.json(carpools);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getCarpoolById = async (req, res) => {
  try {
    const carpool = await prisma.carpool.findUnique({
      where: { id: req.params.id },
      include: { driver: true, vehicle: true }
    });
    if (!carpool) return res.status(404).json({ error: 'Not found' });
    res.json(carpool);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createCarpool = async (req, res) => {
  try {
    const carpool = await prisma.carpool.create({ data: req.body });
    res.status(201).json(carpool);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateCarpool = async (req, res) => {
  try {
    const updated = await prisma.carpool.update({
      where: { id: req.params.id },
      data: req.body
    });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteCarpool = async (req, res) => {
  try {
    await prisma.carpool.delete({ where: { id: req.params.id } });
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
