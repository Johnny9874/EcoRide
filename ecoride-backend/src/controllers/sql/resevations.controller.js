import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getAllReservation = async (req, res) => {
    try {
        const reservations = await prisma.reservation.findMany({
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                        pseudo: true
                    }
                },
                carpool: {
                    select:  {
                        id: true,
                        from: true,
                        to: true,
                        date: true
                    }
                }
            }
        });
        res.json(reservations);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getReservationById = async (req, res) => {
    try {
        const reservation = await prisma.reservation.findUnique({
            where: { id: req.params.id },
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                        pseudo: true
                    }
                },
                carpool: {
                    select:  {
                        id: true,
                        from: true,
                        to: true,
                        date: true
                    }
                }
            }
        });
        if (!reservation) return res.status(404).json({ error: 'Not found' });
        res.json(reservation);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getMyReservations = async (req, res) => {
  try {
    const userId = req.user.id;

    const reservations = await prisma.reservation.findMany({
      where: { userId },
      include: {
        carpool: { include: { driver: true } }
      }
    });

    res.json(reservations);
  } catch (err) {
    res.status(500).json({ error: "Impossible de récupérer les réservations" });
  }
};

export const createReservation = async (req, res) => {
  try {
    const { carpoolId } = req.body;
    const userId = req.user.id; // récupéré via JWT

    if (!carpoolId) {
      return res.status(400).json({ error: "Un carpoolId est requis" });
    }

    // Vérifie les places restantes
    const carpool = await prisma.carpool.findUnique({ where: { id: carpoolId } });
    if (!carpool || carpool.seatsLeft <= 0) {
      return res.status(400).json({ error: "Plus de places disponibles pour ce trajet" });
    }

    // Crée la réservation
    const reservation = await prisma.reservation.create({ 
      data: {
        user: { connect: { id: userId } },
        carpool: { connect: { id: carpoolId } },
      },
      include: {
        carpool: { include: { driver: true } },
        user: true
      }
    });

    // Décrémente les places restantes
    await prisma.carpool.update({
      where: { id: carpoolId },
      data: { seatsLeft: { decrement: 1 } }
    });

    res.status(201).json(reservation);
  } catch (err) {
    console.error("Erreur création réservation:", err);
    res.status(400).json({ error: err.message });
  }
};

export const updateReservation = async (req, res) => {
    try {
        const updated = await prisma.reservation.update({
            where: {  id: req.params.id},
            data: req.body
        }).catch(() => null );

        if (!updated) return res.status(404).json({ error: 'Reservation not found' });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteReservation = async (req, res) => {
    try {
        await prisma.reservation.delete({ where: { id: req.params.id } });
        res.status(204).end();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};