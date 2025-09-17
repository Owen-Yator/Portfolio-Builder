import express from 'express';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

// Placeholder routes for future implementation
router.use(protect);

router.get('/', (req, res) => {
  res.json({ status: 'success', message: 'User routes endpoint' });
});

export default router;
