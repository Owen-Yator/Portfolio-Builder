import express from 'express';
import { protect } from '../middleware/authMiddleware';
import { generatePortfolioWithAI } from '../controllers/aiController';

const router = express.Router();

router.use(protect);

router.post('/generate-portfolio', generatePortfolioWithAI);

export default router;
