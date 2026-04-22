/**
 * TEAM ROUTES
 */

import express, { Request, Response } from 'express';
import { protect, AuthRequest } from '../middleware/auth';
import { notifyUser } from '../config/socket';
import {
  createTeam,
  getUserTeams,
  getTeamById,
  updateTeam,
  deleteTeam,
  addMember,
  removeMember,
} from '../services/teamService';

const router = express.Router();

router.use(protect);

/**
 * CREATE TEAM
 */
router.post('/', async (req: Request, res: Response) => {
  try {
    const authReq = req as AuthRequest;
    const userId = authReq.user!.userId;
    const { name, description } = req.body;

    if (!name) {
      res.status(400).json({ success: false, error: 'Team name is required' });
      return;
    }

    const result = await createTeam(userId, { name, description });
    res.status(201).json(result);
  } catch (error) {
    console.error('Create team error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

/**
 * GET MY TEAMS
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const authReq = req as AuthRequest;
    const userId = authReq.user!.userId;
    const result = await getUserTeams(userId);
    res.status(200).json(result);
  } catch (error) {
    console.error('Get teams error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

/**
 * GET ONE TEAM
 */
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const authReq = req as AuthRequest;
    const userId = authReq.user!.userId;
    const teamId = String(req.params.id);  // ← FIXED

    const result = await getTeamById(teamId, userId);

    if (!result.success) {
      res.status(404).json(result);
      return;
    }

    res.status(200).json(result);
  } catch (error) {
    console.error('Get team error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

/**
 * UPDATE TEAM
 */
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const authReq = req as AuthRequest;
    const userId = authReq.user!.userId;
    const teamId = String(req.params.id);  // ← FIXED
    const { name, description } = req.body;

    const result = await updateTeam(teamId, userId, { name, description });

    if (!result.success) {
      res.status(400).json(result);
      return;
    }

    res.status(200).json(result);
  } catch (error) {
    console.error('Update team error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

/**
 * DELETE TEAM
 */
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const authReq = req as AuthRequest;
    const userId = authReq.user!.userId;
    const teamId = String(req.params.id);  // ← FIXED

    const result = await deleteTeam(teamId, userId);

    if (!result.success) {
      res.status(400).json(result);
      return;
    }

    res.status(200).json({ success: true, message: 'Team deleted' });
  } catch (error) {
    console.error('Delete team error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});


/**
 * ADD MEMBER
 */
router.post('/:id/members', async (req: Request, res: Response) => {
  try {
    const authReq = req as AuthRequest;
    const userId = authReq.user!.userId;
    const teamId = String(req.params.id);
    const { memberId, email, role } = req.body;

    let memberToAdd = memberId;

    if (!memberToAdd && email) {
      const User = require('../models/User').default;
      const user = await User.findOne({ email: email.toLowerCase() });
      if (!user) {
        res.status(404).json({ success: false, error: 'User not found with that email' });
        return;
      }
      memberToAdd = user._id.toString();
    }

    if (!memberToAdd) {
      res.status(400).json({ success: false, error: 'Member ID or email is required' });
      return;
    }

    const result = await addMember(teamId, userId, memberToAdd, role || 'member');

    if (!result.success) {
      res.status(400).json(result);
      return;
    }

    // Send real-time notification to the new member
    notifyUser(memberToAdd, 'team_invite', {
      message: `You were added to a team!`,
      teamId: teamId,
      teamName: result.team?.name || 'New Team'
    });

    res.status(200).json(result);
  } catch (error) {
    console.error('Add member error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

/**
 * REMOVE MEMBER
 */
router.delete('/:id/members/:memberId', async (req: Request, res: Response) => {
  try {
    const authReq = req as AuthRequest;
    const userId = authReq.user!.userId;
    const teamId = String(req.params.id);  // ← FIXED
    const memberToRemoveId = String(req.params.memberId);  // ← FIXED

    const result = await removeMember(teamId, userId, memberToRemoveId);

    if (!result.success) {
      res.status(400).json(result);
      return;
    }

    res.status(200).json({ success: true, message: 'Member removed' });
  } catch (error) {
    console.error('Remove member error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

export default router;