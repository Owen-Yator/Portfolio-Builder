import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';
import { AppError, catchAsync } from './errorMiddleware';

// Extend Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

interface JwtPayload {
  userId: string;
  iat: number;
  exp: number;
}

// Generate JWT token
export const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  });
};

// Generate refresh token
export const generateRefreshToken = (userId: string): string => {
  return jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET as string, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d'
  });
};

// Verify JWT token
export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
};

// Verify refresh token
export const verifyRefreshToken = (token: string): JwtPayload => {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET as string) as JwtPayload;
};

// Protect routes - require authentication
export const protect = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  // 1) Get token and check if it exists
  let token: string | undefined;
  
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('You are not logged in! Please log in to get access.', 401));
  }

  // 2) Verify token
  const decoded = verifyToken(token);

  // 3) Check if user still exists
  const user = await User.findById(decoded.userId);
  if (!user) {
    return next(new AppError('The user belonging to this token no longer exists.', 401));
  }

  // 4) Check if user is locked
  if (user.isLocked()) {
    return next(new AppError('Your account has been locked due to too many failed login attempts.', 423));
  }

  // 5) Check if user changed password after the token was issued
  // Note: This would require a passwordChangedAt field in the user model
  // if (user.changedPasswordAfter(decoded.iat)) {
  //   return next(new AppError('User recently changed password! Please log in again.', 401));
  // }

  // Grant access to protected route
  req.user = user;
  next();
});

// Restrict to certain roles
export const restrictTo = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError('Access denied. Please log in.', 401));
    }

    // For now, we'll use subscription plan as role
    if (!roles.includes(req.user.subscription.plan)) {
      return next(new AppError('You do not have permission to perform this action', 403));
    }

    next();
  };
};

// Optional authentication - doesn't fail if no token
export const optionalAuth = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  let token: string | undefined;
  
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (token) {
    try {
      const decoded = verifyToken(token);
      const user = await User.findById(decoded.userId);
      
      if (user && !user.isLocked()) {
        req.user = user;
      }
    } catch (error) {
      // Token is invalid, but we don't throw an error for optional auth
      console.log('Invalid token in optional auth:', error);
    }
  }

  next();
});

// Check if user owns resource or is admin
export const checkOwnership = (resourceOwnerField = 'owner') => {
  return (req: Request, res: Response, next: NextFunction) => {
    const resource = res.locals.resource || req.body;
    
    if (!req.user) {
      return next(new AppError('Authentication required', 401));
    }

    const isOwner = resource[resourceOwnerField] && 
                    resource[resourceOwnerField].toString() === req.user._id.toString();
    
    const isAdmin = req.user.subscription.plan === 'enterprise'; // Or however you define admin

    if (!isOwner && !isAdmin) {
      return next(new AppError('You do not have permission to perform this action', 403));
    }

    next();
  };
};

// Rate limiting for specific users
export const userRateLimit = (maxRequests: number, windowMs: number) => {
  const requests = new Map();

  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next();
    }

    const userId = req.user._id.toString();
    const now = Date.now();
    const windowStart = now - windowMs;

    // Clean up old entries
    if (requests.has(userId)) {
      const userRequests = requests.get(userId).filter((time: number) => time > windowStart);
      requests.set(userId, userRequests);
    }

    const userRequests = requests.get(userId) || [];

    if (userRequests.length >= maxRequests) {
      return next(new AppError(`Rate limit exceeded. Maximum ${maxRequests} requests per ${windowMs / 1000} seconds.`, 429));
    }

    userRequests.push(now);
    requests.set(userId, userRequests);

    next();
  };
};
