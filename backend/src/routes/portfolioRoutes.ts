import express from 'express';
import { body, param, query } from 'express-validator';
import {
  createPortfolio,
  getAllPortfolios,
  getPortfolio,
  updatePortfolio,
  deletePortfolio,
  getMyPortfolios,
  publishPortfolio,
  unpublishPortfolio,
  duplicatePortfolio,
  getPortfolioStats,
  incrementPortfolioViews
} from '../controllers/portfolioController';
import { protect, optionalAuth } from '../middleware/authMiddleware';

const router = express.Router();

// Public routes
router.get('/public', getAllPortfolios);
router.get('/slug/:slug', optionalAuth, getPortfolio);
router.post('/views/:id', incrementPortfolioViews);

// Protected routes
router.use(protect);

router.get('/my', getMyPortfolios);
router.post('/', [
  body('title')
    .isLength({ min: 1, max: 100 })
    .withMessage('Title is required and cannot exceed 100 characters')
    .trim(),
  body('template')
    .isIn(['modern', 'minimal', 'creative', 'professional', 'developer', 'designer'])
    .withMessage('Invalid template type'),
  body('description')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters')
    .trim()
], createPortfolio);

router.get('/:id', getPortfolio);
router.patch('/:id', [
  param('id').isMongoId().withMessage('Invalid portfolio ID'),
  body('title')
    .optional()
    .isLength({ min: 1, max: 100 })
    .withMessage('Title cannot exceed 100 characters')
    .trim(),
  body('description')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters')
    .trim()
], updatePortfolio);

router.delete('/:id', [
  param('id').isMongoId().withMessage('Invalid portfolio ID')
], deletePortfolio);

router.post('/:id/publish', [
  param('id').isMongoId().withMessage('Invalid portfolio ID')
], publishPortfolio);

router.post('/:id/unpublish', [
  param('id').isMongoId().withMessage('Invalid portfolio ID')
], unpublishPortfolio);

router.post('/:id/duplicate', [
  param('id').isMongoId().withMessage('Invalid portfolio ID')
], duplicatePortfolio);

router.get('/:id/stats', [
  param('id').isMongoId().withMessage('Invalid portfolio ID')
], getPortfolioStats);

export default router;
