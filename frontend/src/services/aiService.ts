/* AI SERVICE
What: generates summeries from tasks/projects
Why: gives users quick insights about their work
*/

import type {Task} from '../types';

export interface AISummary{
    totalTasks: number;
    todoCount: number;
    inProgressCount: number;
    doneCount: number;
    highPriorityTasks: Task[];
    completionRate: number;
    suggestion: string;
}

//GENERATE SUMMARY - analyzes tasks and return insights

export const generateSummary = (tasks: Task[]): AISummary =>{
    const todoCount = tasks.filter(t => t.status === 'todo').length;
    const inProgressCount = tasks.filter(t => t.status === 'in-progress').length;
    const doneCount = tasks.filter(t => t.status === 'done').length;
    const totalTasks = tasks.length;

    //Find high priority tasks that, aren't done
    const highPriorityTasks = tasks.filter(
        t => t.priority === 'high' && t.status !== 'done'
    );

    //calculate completion rate
    const completionRate = totalTasks>0
    ? Math.round((doneCount / totalTasks) * 100): 0;

    //generate smart suggestion
    const suggestion = generateSuggestion(
        todoCount,
        inProgressCount,
        doneCount,
        highPriorityTasks
    );

    return{
        totalTasks,
        todoCount,
        inProgressCount,
        doneCount,
        highPriorityTasks,
        completionRate,
        suggestion
    };
};

//Generate suggestion - creates helpful advice based on task status

const generateSuggestion =(
    todo: number,
    inProgress: number,
    done: number,
    highPriority: Task[]
): string => {
  // No tasks
  if (todo + inProgress + done === 0) {
    return "🎯 Start by creating your first task!";
  }

  // All done
  if (todo === 0 && inProgress === 0 && done > 0) {
    return "🎉 Amazing! All tasks completed. Time to plan next steps!";
  }

  // High priority pending
  if (highPriority.length > 0) {
    return `🔴 Focus on "${highPriority[0].title}" - it's high priority!`;
  }

  // Too many in progress
  if (inProgress > 3) {
    return "⚠️ You have many tasks in progress. Try finishing some before starting new ones.";
  }

  // Many todos
  if (todo > 5) {
    return "📋 You have several tasks waiting. Pick the most important one to start!";
  }

  // Good progress
  if (inProgress > 0) {
    return "💪 Good progress! Keep working on your current tasks.";
  }

  // Default
  return "✨ Ready to be productive? Pick a task and get started!";
};