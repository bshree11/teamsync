/**
 * AUTH MIDDLEWARE
 * 
 * What: Checks if user is logged in before allowing access
 */

import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    email: string;
  };
}

/**
 * PROTECT MIDDLEWARE
 */
export const protect = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  
  // Step 1: Get token from header
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({
      success: false,
      error: 'No token provided. Please login.',
    });
    return;
  }
  
  // Step 2: Extract token (remove "Bearer " part)
  const token = authHeader.split(' ')[1];
  
  // Step 3: Verify token
  const decoded = verifyToken(token);
  
  if (!decoded) {
    res.status(401).json({
      success: false,
      error: 'Invalid or expired token. Please login again.',
    });
    return;
  }
  
  // Step 4: Attach user info to request
  req.user = {
    userId: decoded.userId,
    email: decoded.email,
  };
  
  // Step 5: Continue to the next function
  next();
};