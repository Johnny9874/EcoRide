import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getAllCarpools = async (req, res) => {
  try {
    const { depart, arrive, date, passagers, prix, eco } = req.query;

    const filters = {};

    if(depart) {
      filters.from = { contains: depart, mode: "insensitive" };
    }

    if(arrive) {
      filters.to = { contains: arrive, mode: "insensitive" };
    }

    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);

      filters.date = { gte: startDate, lt: endDate };
    }

    if (prix) {
      filters.price = { lte: parseFloat(prix) };
    }

    if (eco) {
      filters.isEco = eco === "true";
    }

    if (passagers) {
      filters.seatsLeft = { gte: parseInt(passagers, 10) };
    }

    const carpools = await prisma.carpool.findMany({
      where: filters,
      include: { 
        driver: {
            select : { id: true, email: true, pseudo: true }
        }, 
        vehicle: true 
        }
    });
    res.json(carpools);
  } catch (err) {
    console.error("Erreur Prisma:", err);
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
    const { from, to, date, price, isEco, seatsTotal, seatsLeft, driverId, vehicleId } = req.body;

    if (!driverId) {
      return res.status(400).json({ error: "Un conducteur (driverId) est requis." });
    }

    const carpool = await prisma.carpool.create({
      data: {
        from,
        to,
        date: new Date(date), // assure un format correct
        price,
        isEco,
        seatsTotal,
        seatsLeft,
        driver: { connect: { id: driverId }},
        vehicle: { connect: { id: vehicleId } } // Associe un véhicule existant
      }
    });

    res.status(201).json(carpool);
  } catch (err) {
    console.error("Erreur création covoiturage:", err);
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
