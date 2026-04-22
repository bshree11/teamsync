import express from 'express';
import { generateSummary } from '../controllers/aiController';
import { protect } from '../middleware/auth';

const router = express.Router();

router.post('/summary', protect, generateSummary);

export default router;