import express from 'express';
import {
    getAllReservation,
    getReservationById,
    createReservation,
    updateReservation,
    deleteReservation
} from '../../controllers/sql/resevations.controller.js';

const router = express.Router();

router.get('/', getAllReservation);
router.get('/:id', getReservationById);
router.post('/', createReservation);
router.put('/:id', updateReservation);
router.delete('/:id', deleteReservation);

export default router;