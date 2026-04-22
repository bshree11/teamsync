/**
 * JWT UTILITY
 * 
 * What: Creates and verifies login tokens
 */

import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret-key-123';

interface TokenPayload {
  userId: string;
  email: string;
}

/**
 * CREATE A TOKEN
 */
export const generateToken = (userId: string, email: string): string => {
  const payload: TokenPayload = { userId, email };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
  return token;
};

/**
 * VERIFY A TOKEN
 */
export const verifyToken = (token: string): TokenPayload | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
    return decoded;
  } catch (error) {
    return null;
  }
};