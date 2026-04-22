/**
 * TASK ROUTES
 */

import express, { Request, Response } from 'express';
import { protect, AuthRequest } from '../middleware/auth';
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from '../services/taskService';

const router = express.Router();

router.use(protect);

/**
 * CREATE TASK
 */
router.post('/', async (req: Request, res: Response) => {
  try {
    const authReq = req as AuthRequest;
    const userId = authReq.user!.userId;
    const { title, description, projectId, assignedTo, priority, dueDate } = req.body;

    if (!title || !projectId) {
      res.status(400).json({
        success: false,
        error: 'Title and projectId are required',
      });
      return;
    }

    const result = await createTask(userId, {
      title,
      description,
      projectId,
      assignedTo,
      priority,
      dueDate,
    });

    if (!result.success) {
      res.status(400).json(result);
      return;
    }

    res.status(201).json(result);
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

/**
 * GET TASKS (with filters)
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const authReq = req as AuthRequest;
    const userId = authReq.user!.userId;

    // Get filters from query string
    const filters = {
      projectId: req.query.projectId as string,
      status: req.query.status as string,
      priority: req.query.priority as string,
      assignedTo: req.query.assignedTo as string,
    };

    const result = await getTasks(userId, filters);
    res.status(200).json(result);
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

/**
 * GET ONE TASK
 */
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const authReq = req as AuthRequest;
    const userId = authReq.user!.userId;
    const taskId = String(req.params.id);

    const result = await getTaskById(taskId, userId);

    if (!result.success) {
      res.status(404).json(result);
      return;
    }

    res.status(200).json(result);
  } catch (error) {
    console.error('Get task error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

/**
 * UPDATE TASK
 */
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const authReq = req as AuthRequest;
    const userId = authReq.user!.userId;
    const taskId = String(req.params.id);
    const { title, description, status, priority, assignedTo, dueDate } = req.body;

    const result = await updateTask(taskId, userId, {
      title,
      description,
      status,
      priority,
      assignedTo,
      dueDate,
    });

    if (!result.success) {
      res.status(400).json(result);
      return;
    }

    res.status(200).json(result);
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

/**
 * DELETE TASK
 */
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const authReq = req as AuthRequest;
    const userId = authReq.user!.userId;
    const taskId = String(req.params.id);

    const result = await deleteTask(taskId, userId);

    if (!result.success) {
      res.status(400).json(result);
      return;
    }

    res.status(200).json({ success: true, message: 'Task deleted' });
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

export default router;