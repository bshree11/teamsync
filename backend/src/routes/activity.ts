// ACTIVITY ROUTES....

import express, { Request, Response } from 'express';
import { protect, AuthRequest } from '../middleware/auth';
import { getActivityFeed, getProjectActivity } from '../services/activityService';

const router = express.Router();

router.use(protect);

/**
 * GET ACTIVITY FEED
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const authReq = req as AuthRequest;
    const userId = authReq.user!.userId;

    const result = await getActivityFeed(userId);
    res.status(200).json(result);
  } catch (error) {
    console.error('Get activity error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

/**
 * GET PROJECT ACTIVITY
 */
router.get('/project/:id', async (req: Request, res: Response) => {
  try {
    const authReq = req as AuthRequest;
    const userId = authReq.user!.userId;
    const projectId = String(req.params.id);

    const result = await getProjectActivity(projectId, userId);

    if (!result.success) {
      res.status(404).json(result);
      return;
    }

    res.status(200).json(result);
  } catch (error) {
    console.error('Get project activity error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

export default router;