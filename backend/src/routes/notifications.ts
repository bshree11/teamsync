//NOTIFICATION ROUTES...

import express, { Request, Response } from 'express';
import { protect, AuthRequest } from '../middleware/auth';
import {
  getUserNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
} from '../services/notificationService';

const router = express.Router();

router.use(protect);

/**
 * GET MY NOTIFICATIONS
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const authReq = req as AuthRequest;
    const userId = authReq.user!.userId;

    const result = await getUserNotifications(userId);
    res.status(200).json(result);
  } catch (error) {
    console.error('Get notifications error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

/**
 * MARK ALL AS READ
 */
router.put('/read-all', async (req: Request, res: Response) => {
  try {
    const authReq = req as AuthRequest;
    const userId = authReq.user!.userId;

    const result = await markAllAsRead(userId);
    res.status(200).json({ success: true, message: 'All marked as read' });
  } catch (error) {
    console.error('Mark all read error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

/**
 * MARK ONE AS READ
 */
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const authReq = req as AuthRequest;
    const userId = authReq.user!.userId;
    const notificationId = String(req.params.id);

    const result = await markAsRead(notificationId, userId);

    if (!result.success) {
      res.status(400).json(result);
      return;
    }

    res.status(200).json(result);
  } catch (error) {
    console.error('Mark read error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

/**
 * DELETE NOTIFICATION
 */
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const authReq = req as AuthRequest;
    const userId = authReq.user!.userId;
    const notificationId = String(req.params.id);

    const result = await deleteNotification(notificationId, userId);

    if (!result.success) {
      res.status(400).json(result);
      return;
    }

    res.status(200).json({ success: true, message: 'Notification deleted' });
  } catch (error) {
    console.error('Delete notification error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

export default router;