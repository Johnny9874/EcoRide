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

export const createReservation = async (req, res) => {
    try {
        const { userId, carpoolId } = req.body;
        const reservation = await prisma.reservation.create({ 
                data: {
                    user: { connect: { id: userId } },
                    carpool: { connect: { id: carpoolId } }
                }
            });
        res.status(201).json(reservation);
    } catch (err) {
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