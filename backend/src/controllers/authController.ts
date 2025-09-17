import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import User, { IUser } from '../models/User';
import { AppError, catchAsync } from '../middleware/errorMiddleware';
import { generateToken, generateRefreshToken, verifyRefreshToken } from '../middleware/authMiddleware';

// Helper function to send token response
const createSendToken = (user: IUser, statusCode: number, res: Response) => {
  const token = generateToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  // Update last login
  user.lastLogin = new Date();
  user.loginAttempts = 0; // Reset login attempts on successful login
  user.save({ validateBeforeSave: false });

  res.status(statusCode).json({
    status: 'success',
    token,
    refreshToken,
    data: {
      user
    }
  });
};

// Register new user
export const register = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      status: 'error',
      message: 'Validation errors',
      errors: errors.array()
    });
    return;
  }

  const { username, email, password, firstName, lastName } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({
    $or: [{ email }, { username }]
  });

  if (existingUser) {
    if (existingUser.email === email) {
      throw new AppError('User with this email already exists', 409);
    }
    if (existingUser.username === username) {
      throw new AppError('Username is already taken', 409);
    }
  }

  // Create new user
  const newUser = await User.create({
    username,
    email,
    password,
    firstName,
    lastName
  });

  // Generate email verification token (in a real app, send email)
  newUser.emailVerificationToken = Math.random().toString(36).substring(2, 15);
  await newUser.save({ validateBeforeSave: false });

  createSendToken(newUser, 201, res);
});

// Login user
export const login = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      status: 'error',
      message: 'Validation errors',
      errors: errors.array()
    });
    return;
  }

  const { email, password } = req.body;

  // Find user and include password
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    throw new AppError('Invalid email or password', 401);
  }

  // Check if account is locked
  if (user.isLocked()) {
    throw new AppError('Account is temporarily locked due to too many failed login attempts. Please try again later.', 423);
  }

  // Check password
  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    // Increment login attempts
    await user.incLoginAttempts();
    throw new AppError('Invalid email or password', 401);
  }

  createSendToken(user, 200, res);
});

// Logout user
export const logout = catchAsync(async (req: Request, res: Response): Promise<void> => {
  res.status(200).json({
    status: 'success',
    message: 'Logged out successfully'
  });
});

// Refresh token
export const refreshToken = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    throw new AppError('Refresh token is required', 400);
  }

  // Verify refresh token
  const decoded = verifyRefreshToken(refreshToken);

  // Find user
  const user = await User.findById(decoded.userId);
  if (!user) {
    throw new AppError('Invalid refresh token', 401);
  }

  // Generate new tokens
  const newToken = generateToken(user._id);
  const newRefreshToken = generateRefreshToken(user._id);

  res.status(200).json({
    status: 'success',
    token: newToken,
    refreshToken: newRefreshToken,
    data: {
      user
    }
  });
});

// Forgot password
export const forgotPassword = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      status: 'error',
      message: 'Validation errors',
      errors: errors.array()
    });
    return;
  }

  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError('No user found with that email address', 404);
  }

  // Generate reset token
  const resetToken = user.generatePasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // In a real application, send email with reset link
  // For now, just return the token (REMOVE IN PRODUCTION)
  res.status(200).json({
    status: 'success',
    message: 'Password reset token sent to email',
    resetToken // REMOVE THIS IN PRODUCTION
  });
});

// Reset password
export const resetPassword = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      status: 'error',
      message: 'Validation errors',
      errors: errors.array()
    });
    return;
  }

  const { token } = req.params;
  const { password } = req.body;

  // Find user with valid reset token
  const user = await User.findOne({
    passwordResetExpires: { $gt: new Date() }
  });

  if (!user) {
    throw new AppError('Token is invalid or has expired', 400);
  }

  // Set new password
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  createSendToken(user, 200, res);
});

// Verify email
export const verifyEmail = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const { token } = req.params;

  const user = await User.findOne({ emailVerificationToken: token });
  if (!user) {
    throw new AppError('Invalid verification token', 400);
  }

  user.isEmailVerified = true;
  user.emailVerificationToken = undefined;
  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    status: 'success',
    message: 'Email verified successfully'
  });
});

// Resend verification email
export const resendVerificationEmail = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      status: 'error',
      message: 'Validation errors',
      errors: errors.array()
    });
    return;
  }

  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError('No user found with that email address', 404);
  }

  if (user.isEmailVerified) {
    throw new AppError('Email is already verified', 400);
  }

  // Generate new verification token
  user.emailVerificationToken = Math.random().toString(36).substring(2, 15);
  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    status: 'success',
    message: 'Verification email sent'
  });
});

// Change password
export const changePassword = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      status: 'error',
      message: 'Validation errors',
      errors: errors.array()
    });
    return;
  }

  const { currentPassword, newPassword } = req.body;
  const user = await User.findById(req.user!._id).select('+password');

  if (!user) {
    throw new AppError('User not found', 404);
  }

  // Check current password
  const isCurrentPasswordCorrect = await user.comparePassword(currentPassword);
  if (!isCurrentPasswordCorrect) {
    throw new AppError('Current password is incorrect', 401);
  }

  // Update password
  user.password = newPassword;
  await user.save();

  res.status(200).json({
    status: 'success',
    message: 'Password changed successfully'
  });
});

// Get current user
export const getMe = catchAsync(async (req: Request, res: Response): Promise<void> => {
  res.status(200).json({
    status: 'success',
    data: {
      user: req.user
    }
  });
});

// Update user profile
export const updateProfile = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      status: 'error',
      message: 'Validation errors',
      errors: errors.array()
    });
    return;
  }

  const {
    firstName,
    lastName,
    bio,
    website,
    socialLinks,
    preferences
  } = req.body;

  const updateData: any = {};
  if (firstName) updateData.firstName = firstName;
  if (lastName) updateData.lastName = lastName;
  if (bio !== undefined) updateData.bio = bio;
  if (website !== undefined) updateData.website = website;
  if (socialLinks) updateData.socialLinks = { ...req.user!.socialLinks, ...socialLinks };
  if (preferences) updateData.preferences = { ...req.user!.preferences, ...preferences };

  const user = await User.findByIdAndUpdate(
    req.user!._id,
    updateData,
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  });
});
