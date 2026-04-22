/**
 * PROJECT ROUTES
 */

import express, { Request, Response } from 'express';
import { protect, AuthRequest } from '../middleware/auth';
import {
  createProject,
  getUserProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from '../services/projectService';

const router = express.Router();

router.use(protect);

/**
 * CREATE PROJECT
 */
router.post('/', async (req: Request, res: Response) => {
  try {
    const authReq = req as AuthRequest;
    const userId = authReq.user!.userId;
    const { name, description, teamId } = req.body;

    if (!name || !teamId) {
      res.status(400).json({
        success: false,
        error: 'Name and teamId are required',
      });
      return;
    }

    const result = await createProject(userId, { name, description, teamId });

    if (!result.success) {
      res.status(400).json(result);
      return;
    }

    res.status(201).json(result);
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

/**
 * GET MY PROJECTS
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const authReq = req as AuthRequest;
    const userId = authReq.user!.userId;

    const result = await getUserProjects(userId);
    res.status(200).json(result);
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

/**
 * GET ONE PROJECT
 */
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const authReq = req as AuthRequest;
    const userId = authReq.user!.userId;
    const projectId = String(req.params.id);

    const result = await getProjectById(projectId, userId);

    if (!result.success) {
      res.status(404).json(result);
      return;
    }

    res.status(200).json(result);
  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

/**
 * UPDATE PROJECT
 */
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const authReq = req as AuthRequest;
    const userId = authReq.user!.userId;
    const projectId = String(req.params.id);
    const { name, description, status } = req.body;

    const result = await updateProject(projectId, userId, { name, description, status });

    if (!result.success) {
      res.status(400).json(result);
      return;
    }

    res.status(200).json(result);
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

/**
 * DELETE PROJECT
 */
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const authReq = req as AuthRequest;
    const userId = authReq.user!.userId;
    const projectId = String(req.params.id);

    const result = await deleteProject(projectId, userId);

    if (!result.success) {
      res.status(400).json(result);
      return;
    }

    res.status(200).json({ success: true, message: 'Project deleted' });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

export default router;