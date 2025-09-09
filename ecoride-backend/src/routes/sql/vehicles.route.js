import express from 'express';
import {
    getAllVehicles,
    getVehicleById,
    createVehicle,
    updateVehicle,
    deleteVehicle
} from '../../controllers/sql/vehicles.controller.js';

const router = express.Router();

router.get('/', getAllVehicles);
router.get('/:id', getVehicleById);
router.post('/', createVehicle);
router.put('/:id', updateVehicle);
router.delete('/:id', deleteVehicle);

export default router;