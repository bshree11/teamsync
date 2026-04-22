import { Request, Response } from 'express';
import { HfInference } from '@huggingface/inference';

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

export const generateSummary = async (req: Request, res: Response) => {
  try {
    const { tasks } = req.body;

    if (!tasks || !Array.isArray(tasks)) {
      return res.status(400).json({
        success: false,
        error: 'Tasks array is required'
      });
    }

    const todoCount = tasks.filter((t: any) => t.status === 'todo').length;
    const inProgressCount = tasks.filter((t: any) => t.status === 'in-progress').length;
    const doneCount = tasks.filter((t: any) => t.status === 'done').length;
    const totalTasks = tasks.length;

    const highPriorityTasks = tasks
      .filter((t: any) => t.priority === 'high' && t.status !== 'done')
      .map((t: any) => t.title);

    const aiSuggestion = await callHuggingFace(todoCount, inProgressCount, doneCount, highPriorityTasks);

    res.json({
      success: true,
      summary: {
        totalTasks,
        todoCount,
        inProgressCount,
        doneCount,
        completionRate: totalTasks > 0 ? Math.round((doneCount / totalTasks) * 100) : 0,
        highPriorityTasks,
        suggestion: aiSuggestion
      }
    });
  } catch (error) {
    console.error('AI Summary Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate summary'
    });
  }
};

const callHuggingFace = async (
  todo: number,
  inProgress: number,
  done: number,
  highPriority: string[]
): Promise<string> => {
  try {

    const response = await hf.chatCompletion({
      model: 'microsoft/DialoGPT-medium',
      messages: [
        {
          role: 'user',
          content: `You are a productivity assistant. Give ONE short tip (max 15 words) for someone with ${todo} pending tasks, ${inProgress} in progress, and ${done} completed.`
        }
      ],
      max_tokens: 50
    });

    if (response.choices && response.choices[0] && response.choices[0].message) {
      const tip = response.choices[0].message.content || '';
      return '🤖 ' + tip.trim().slice(0, 100);
    }

    return generateLocalSuggestion(todo, inProgress, done, highPriority);
  } catch (error: any) {

    // console.log('Hugging Face Error:', error.message);
    
    return generateLocalSuggestion(todo, inProgress, done, highPriority);
  }
};

const generateLocalSuggestion = (
  todo: number,
  inProgress: number,
  done: number,
  highPriority: string[]
): string => {
  if (todo + inProgress + done === 0) {
    return '🎯 Start by creating your first task!';
  }
  if (todo === 0 && inProgress === 0 && done > 0) {
    return '🎉 Amazing! All tasks completed!';
  }
  if (highPriority.length > 0) {
    return `🔴 Focus on "${highPriority[0]}" - it's high priority!`;
  }
  if (inProgress > 3) {
    return '⚠️ Too many tasks in progress. Finish some first.';
  }
  if (todo > 5) {
    return '📋 Many tasks waiting. Pick the most important one!';
  }
  if (inProgress > 0) {
    return '💪 Good progress! Keep going!';
  }
  return '✨ Ready to be productive? Pick a task!';
};