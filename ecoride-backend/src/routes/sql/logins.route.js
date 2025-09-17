import express from 'express';
import { loginUser } from '../../controllers/sql/logins.controller.js';

const router = express.Router();

router.post('/', loginUser);

export default router;