/**
 * USER ROUTES
 * 
 * GET  /api/users/profile   - Get my profile
 * PUT  /api/users/profile   - Update my profile
 * PUT  /api/users/password  - Change password
 * GET  /api/users           - List all users
 */

import express, { Request, Response } from 'express';
import { protect, AuthRequest } from '../middleware/auth';
import {
  getProfile,
  updateProfile,
  changePassword,
  getAllUsers,
} from '../services/userService';

const router = express.Router();

// All routes need authentication
router.use(protect);

/**
 * GET MY PROFILE
 */
router.get('/profile', async (req: Request, res: Response) => {
  try {
    const authReq = req as AuthRequest;
    const userId = authReq.user!.userId;

    const result = await getProfile(userId);

    if (!result.success) {
      res.status(404).json(result);
      return;
    }

    res.status(200).json(result);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

/**
 * UPDATE MY PROFILE
 */
router.put('/profile', async (req: Request, res: Response) => {
  try {
    const authReq = req as AuthRequest;
    const userId = authReq.user!.userId;
    const { name, avatar } = req.body;

    const result = await updateProfile(userId, { name, avatar });

    if (!result.success) {
      res.status(400).json(result);
      return;
    }

    res.status(200).json(result);
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

/**
 * CHANGE PASSWORD
 */
router.put('/password', async (req: Request, res: Response) => {
  try {
    const authReq = req as AuthRequest;
    const userId = authReq.user!.userId;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      res.status(400).json({
        success: false,
        error: 'Please provide current and new password',
      });
      return;
    }

    if (newPassword.length < 6) {
      res.status(400).json({
        success: false,
        error: 'New password must be at least 6 characters',
      });
      return;
    }

    const result = await changePassword(userId, { currentPassword, newPassword });

    if (!result.success) {
      res.status(400).json(result);
      return;
    }

    res.status(200).json({ success: true, message: 'Password changed successfully' });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

/**
 * GET ALL USERS
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const result = await getAllUsers();
    res.status(200).json(result);
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

export default router;