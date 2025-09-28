import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { logger } from '../utils/logger';

interface JWTPayload {
  id: string;
  email: string;
  role: string;
  plan: string;
  iat: number;
  exp: number;
}

declare global {
  namespace Express {
    interface Request {
      user?: JWTPayload;
    }
  }
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        error: 'Unauthorized',
        message: 'No valid authorization token provided'
      });
      return;
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    if (!token) {
      res.status(401).json({
        error: 'Unauthorized',
        message: 'No token provided'
      });
      return;
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'fallback-secret'
    ) as JWTPayload;

    req.user = decoded;
    next();
  } catch (error) {
    logger.error('Authentication error:', error);

    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({
        error: 'Token Expired',
        message: 'Your session has expired. Please log in again.'
      });
      return;
    }

    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({
        error: 'Invalid Token',
        message: 'Invalid authentication token'
      });
      return;
    }

    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Authentication service error'
    });
  }
};

export const optionalAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);

      if (token) {
        const decoded = jwt.verify(
          token,
          process.env.JWT_SECRET || 'fallback-secret'
        ) as JWTPayload;

        req.user = decoded;
      }
    }

    next();
  } catch (error) {
    // For optional auth, we don't throw errors, just continue without user
    logger.warn('Optional auth failed:', error);
    next();
  }
};

export const requireRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        error: 'Unauthorized',
        message: 'Authentication required'
      });
      return;
    }

    if (!roles.includes(req.user.role)) {
      res.status(403).json({
        error: 'Forbidden',
        message: 'Insufficient permissions'
      });
      return;
    }

    next();
  };
};

export const requirePlan = (plans: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        error: 'Unauthorized',
        message: 'Authentication required'
      });
      return;
    }

    if (!plans.includes(req.user.plan)) {
      res.status(403).json({
        error: 'Plan Upgrade Required',
        message: 'This feature requires a higher subscription plan'
      });
      return;
    }

    next();
  };
};