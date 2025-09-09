import express from 'express';
import {
    getAllPreference,
    getPreferenceById,
    createPreference,
    updatePreference,
    deletePreference
} from '../../controllers/sql/preferences.controller.js';

const router = express.Router();

router.get('/', getAllPreference);
router.get('/:id', getPreferenceById);
router.post('/', createPreference);
router.put('/:id', updatePreference);
router.delete('/:id', deletePreference);

export default router;