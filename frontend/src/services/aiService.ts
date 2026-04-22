/**
 * AI SERVICE
 * 
 * What: Connects to backend AI endpoint
 * Why: Get real AI-powered summaries
 */

import api from './api';
import type { Task } from '../types';

export interface AISummary {
  totalTasks: number;
  todoCount: number;
  inProgressCount: number;
  doneCount: number;
  highPriorityTasks: string[];
  completionRate: number;
  suggestion: string;
}

/**
 * GENERATE SUMMARY
 * Sends tasks to backend, gets AI summary
 */
export const generateSummary = async (tasks: Task[]): Promise<AISummary> => {
  try {
    const response = await api.post<{ success: boolean; summary: AISummary }>(
      '/ai/summary',
      { tasks }
    );
    return response.data.summary;
  } catch (error) {
    // Fallback if API fails
    return generateLocalSummary(tasks);
  }
};

/**
 * LOCAL FALLBACK
 * If API fails, generate summary locally
 */
const generateLocalSummary = (tasks: Task[]): AISummary => {
  const todoCount = tasks.filter(t => t.status === 'todo').length;
  const inProgressCount = tasks.filter(t => t.status === 'in-progress').length;
  const doneCount = tasks.filter(t => t.status === 'done').length;
  const totalTasks = tasks.length;

  const highPriorityTasks = tasks
    .filter(t => t.priority === 'high' && t.status !== 'done')
    .map(t => t.title);

  const completionRate = totalTasks > 0
    ? Math.round((doneCount / totalTasks) * 100)
    : 0;

  let suggestion = '✨ Ready to be productive!';
  
  if (totalTasks === 0) {
    suggestion = '🎯 Start by creating your first task!';
  } else if (todoCount === 0 && inProgressCount === 0) {
    suggestion = '🎉 Amazing! All tasks completed!';
  } else if (highPriorityTasks.length > 0) {
    suggestion = `🔴 Focus on "${highPriorityTasks[0]}" first!`;
  } else if (inProgressCount > 3) {
    suggestion = '⚠️ Too many tasks in progress. Finish some first!';
  }

  return {
    totalTasks,
    todoCount,
    inProgressCount,
    doneCount,
    highPriorityTasks,
    completionRate,
    suggestion
  };
};