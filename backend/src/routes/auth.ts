/**
 * AUTH ROUTES
 * 
 * POST /api/auth/register - Create new account
 * POST /api/auth/login    - Login to account
 * GET  /api/auth/me       - Get current user
 */

import express, { Request, Response } from 'express';
import { registerUser, loginUser, getUserById } from '../services/authService';
import { protect, AuthRequest } from '../middleware/auth';

const router = express.Router();

/**
 * REGISTER
 */
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      res.status(400).json({
        success: false,
        error: 'Please provide email, password, and name',
      });
      return;
    }

    const result = await registerUser({ email, password, name });

    if (!result.success) {
      res.status(400).json(result);
      return;
    }

    res.status(201).json(result);

  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
});

/**
 * LOGIN
 */
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        success: false,
        error: 'Please provide email and password',
      });
      return;
    }

    const result = await loginUser({ email, password });

    if (!result.success) {
      res.status(401).json(result);
      return;
    }

    res.status(200).json(result);

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
});

/**
 * GET CURRENT USER (Protected)
 */
router.get('/me', protect, async (req: Request, res: Response) => {
  try {
    const authReq = req as AuthRequest;
    const userId = authReq.user?.userId;

    if (!userId) {
      res.status(401).json({
        success: false,
        error: 'Not authorized',
      });
      return;
    }

    const user = await getUserById(userId);

    if (!user) {
      res.status(404).json({
        success: false,
        error: 'User not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });

  } catch (error) {
    console.error('Get me error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
});

export default router;