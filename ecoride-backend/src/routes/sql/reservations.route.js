import express from 'express';
import {
    getAllReservation,
    getReservationById,
    createReservation,
    updateReservation,
    deleteReservation,
    getMyReservations
} from '../../controllers/sql/resevations.controller.js';
import { verifyToken } from '../../utils/jwt.js';

const router = express.Router();

router.get('/', getAllReservation);
router.get('/me', verifyToken, getMyReservations);
router.get('/:id', getReservationById);
router.post('/', verifyToken, createReservation);
router.put('/:id', updateReservation);
router.delete('/:id', deleteReservation);

export default router;