import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import Portfolio, { IPortfolio } from '../models/Portfolio';
import { AppError, catchAsync } from '../middleware/errorMiddleware';

// Create new portfolio
export const createPortfolio = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      status: 'error',
      message: 'Validation errors',
      errors: errors.array()
    });
    return;
  }

  const { title, template, description, sections } = req.body;

  const portfolio = await Portfolio.create({
    title,
    template,
    description,
    sections: sections || [],
    owner: req.user!._id
  });

  res.status(201).json({
    status: 'success',
    data: {
      portfolio
    }
  });
});

// Get all public portfolios
export const getAllPortfolios = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;

  const filter: any = { 'settings.isPublic': true };
  
  if (req.query.template) {
    filter.template = req.query.template;
  }

  const portfolios = await Portfolio.find(filter)
    .populate('owner', 'username firstName lastName avatar')
    .sort({ publishedAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Portfolio.countDocuments(filter);

  res.status(200).json({
    status: 'success',
    results: portfolios.length,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    },
    data: {
      portfolios
    }
  });
});

// Get single portfolio
export const getPortfolio = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const { id, slug } = req.params;
  
  let portfolio: IPortfolio | null;
  
  if (slug) {
    portfolio = await Portfolio.findOne({ slug }).populate('owner', 'username firstName lastName avatar');
  } else {
    portfolio = await Portfolio.findById(id).populate('owner', 'username firstName lastName avatar');
  }

  if (!portfolio) {
    throw new AppError('Portfolio not found', 404);
  }

  // Check if user can view this portfolio
  const canView = portfolio.canView(req.user?._id);
  if (!canView) {
    throw new AppError('You do not have permission to view this portfolio', 403);
  }

  res.status(200).json({
    status: 'success',
    data: {
      portfolio
    }
  });
});

// Get user's portfolios
export const getMyPortfolios = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;

  const portfolios = await Portfolio.find({ owner: req.user!._id })
    .sort({ updatedAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Portfolio.countDocuments({ owner: req.user!._id });

  res.status(200).json({
    status: 'success',
    results: portfolios.length,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    },
    data: {
      portfolios
    }
  });
});

// Update portfolio
export const updatePortfolio = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      status: 'error',
      message: 'Validation errors',
      errors: errors.array()
    });
    return;
  }

  const { id } = req.params;
  
  const portfolio = await Portfolio.findById(id);
  if (!portfolio) {
    throw new AppError('Portfolio not found', 404);
  }

  // Check if user can edit this portfolio
  const canEdit = portfolio.canEdit(req.user!._id);
  if (!canEdit) {
    throw new AppError('You do not have permission to edit this portfolio', 403);
  }

  const updatedPortfolio = await Portfolio.findByIdAndUpdate(
    id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    status: 'success',
    data: {
      portfolio: updatedPortfolio
    }
  });
});

// Delete portfolio
export const deletePortfolio = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const portfolio = await Portfolio.findById(id);
  if (!portfolio) {
    throw new AppError('Portfolio not found', 404);
  }

  // Check if user owns this portfolio
  if (portfolio.owner.toString() !== req.user!._id.toString()) {
    throw new AppError('You do not have permission to delete this portfolio', 403);
  }

  await Portfolio.findByIdAndDelete(id);

  res.status(204).json({
    status: 'success',
    data: null
  });
});

// Publish portfolio
export const publishPortfolio = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const portfolio = await Portfolio.findById(id);
  if (!portfolio) {
    throw new AppError('Portfolio not found', 404);
  }

  const canEdit = portfolio.canEdit(req.user!._id);
  if (!canEdit) {
    throw new AppError('You do not have permission to publish this portfolio', 403);
  }

  portfolio.settings.isPublic = true;
  portfolio.publishedAt = new Date();
  await portfolio.save();

  res.status(200).json({
    status: 'success',
    data: {
      portfolio
    }
  });
});

// Unpublish portfolio
export const unpublishPortfolio = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const portfolio = await Portfolio.findById(id);
  if (!portfolio) {
    throw new AppError('Portfolio not found', 404);
  }

  const canEdit = portfolio.canEdit(req.user!._id);
  if (!canEdit) {
    throw new AppError('You do not have permission to unpublish this portfolio', 403);
  }

  portfolio.settings.isPublic = false;
  portfolio.publishedAt = undefined;
  await portfolio.save();

  res.status(200).json({
    status: 'success',
    data: {
      portfolio
    }
  });
});

// Duplicate portfolio
export const duplicatePortfolio = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const originalPortfolio = await Portfolio.findById(id);
  if (!originalPortfolio) {
    throw new AppError('Portfolio not found', 404);
  }

  const canView = originalPortfolio.canView(req.user!._id);
  if (!canView) {
    throw new AppError('You do not have permission to duplicate this portfolio', 403);
  }

  const portfolioData: any = originalPortfolio.toObject();
  delete portfolioData._id;
  delete portfolioData.slug;
  portfolioData.title = `${portfolioData.title} (Copy)`;
  portfolioData.owner = req.user!._id;
  portfolioData.settings.isPublic = false;
  portfolioData.publishedAt = undefined;
  portfolioData.stats = {
    views: 0,
    uniqueViews: 0,
    shares: 0,
    downloads: 0
  };

  const duplicatedPortfolio = await Portfolio.create(portfolioData);

  res.status(201).json({
    status: 'success',
    data: {
      portfolio: duplicatedPortfolio
    }
  });
});

// Get portfolio stats
export const getPortfolioStats = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const portfolio = await Portfolio.findById(id);
  if (!portfolio) {
    throw new AppError('Portfolio not found', 404);
  }

  const canEdit = portfolio.canEdit(req.user!._id);
  if (!canEdit) {
    throw new AppError('You do not have permission to view stats for this portfolio', 403);
  }

  res.status(200).json({
    status: 'success',
    data: {
      stats: portfolio.stats
    }
  });
});

// Increment portfolio views
export const incrementPortfolioViews = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { isUnique } = req.body;

  const portfolio = await Portfolio.findById(id);
  if (!portfolio) {
    throw new AppError('Portfolio not found', 404);
  }

  await portfolio.incrementViews(isUnique);

  res.status(200).json({
    status: 'success',
    message: 'View recorded'
  });
});
