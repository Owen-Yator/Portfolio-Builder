import express from 'express';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.use(protect);

router.get('/', (req, res) => {
  res.json({ status: 'success', message: 'Analytics routes endpoint' });
});

export default router;
