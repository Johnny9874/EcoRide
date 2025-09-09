import express from 'express';
import {
  getAllCarpools,
  getCarpoolById,
  createCarpool,
  updateCarpool,
  deleteCarpool
} from '../../controllers/sql/carpools.controller.js';

const router = express.Router();


router.get('/', getAllCarpools);
router.get('/:id', getCarpoolById);
router.post('/', createCarpool);
router.put('/:id', updateCarpool);
router.delete('/:id', deleteCarpool);

export default router;
// Export the router to be used in server.js