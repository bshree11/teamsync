/* TASK SERVICE 

What: functions for tasks API calls
Why: keeps API logic separate from UI components
*/

import api from './api';
import type { Task } from '../types';

// Response type for single task
interface TaskResponse {
  success: boolean;
  task: Task;
}

// Response type for multiple tasks
interface TasksResponse {
  success: boolean;
  tasks: Task[];
}

// GET ALL TASKS
export const getTasks = async (): Promise<Task[]> => {
  const response = await api.get<TasksResponse>('/tasks');
  return response.data.tasks;
};

// GET SINGLE TASK
export const getTask = async (id: string): Promise<Task> => {
  const response = await api.get<TaskResponse>(`/tasks/${id}`);
  return response.data.task;
};

// CREATE TASK
export const createTask = async (data: {
  title: string;
  description?: string;
  projectId: string;
  status?: 'todo' | 'in-progress' | 'done';
  priority?: 'low' | 'medium' | 'high';
  assignedTo?: string;
  dueDate?: string;
}): Promise<Task> => {
  const response = await api.post<TaskResponse>('/tasks', data);
  return response.data.task;
};

// UPDATE TASK
export const updateTask = async (
  id: string,
  data: {
    title?: string;
    description?: string;
    status?: 'todo' | 'in-progress' | 'done';
    priority?: 'low' | 'medium' | 'high';
    assignedTo?: string;
    dueDate?: string;
  }
): Promise<Task> => {
  const response = await api.put<TaskResponse>(`/tasks/${id}`, data);
  return response.data.task;
};

// DELETE TASK
export const deleteTask = async (id: string): Promise<void> => {
  await api.delete(`/tasks/${id}`);
};