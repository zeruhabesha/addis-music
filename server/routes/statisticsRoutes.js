import express from 'express';
import { getStatistics } from '../controllers/statisticsController.js';

const router = express.Router();

// GET statistics
router.get('/', getStatistics);

export default router;