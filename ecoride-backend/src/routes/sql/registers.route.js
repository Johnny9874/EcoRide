import express from 'express';
import { registersMiddleWare } from '../../controllers/sql/registers.controller.js';

const router = express.Router();

router.post('/', registersMiddleWare);

export default router;