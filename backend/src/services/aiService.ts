/**
 * AI SERVICE
 * 
 * What: Uses Hugging Face AI to generate task summaries
 * How: Send tasks → AI analyzes → Returns summary
 */

import { HfInference } from '@huggingface/inference';

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

interface Task {
  title: string;
  status: string;
  priority: string;
  dueDate?: Date;
}

interface AISummaryResult {
  success: boolean;
  summary?: string;
  error?: string;
}

/**
 * GENERATE TASK SUMMARY
 */
export const generateTaskSummary = async (
  tasks: Task[],
  projectName: string
): Promise<AISummaryResult> => {
  try {
    // If no tasks, return simple message
    if (tasks.length === 0) {
      return {
        success: true,
        summary: 'No tasks in this project yet. Create your first task!',
      };
    }

    // Count task stats
    const total = tasks.length;
    const todoCount = tasks.filter(t => t.status === 'todo').length;
    const inProgressCount = tasks.filter(t => t.status === 'in-progress').length;
    const doneCount = tasks.filter(t => t.status === 'done').length;
    const highPriority = tasks.filter(t => t.priority === 'high').length;

    // Format tasks for AI
    const taskList = tasks.map((task, index) => {
      return `${index + 1}. "${task.title}" - Status: ${task.status}, Priority: ${task.priority}`;
    }).join('\n');

    const prompt = `Summarize this project in 2-3 sentences:

Project: ${projectName}
Total Tasks: ${total}
To Do: ${todoCount}, In Progress: ${inProgressCount}, Done: ${doneCount}
High Priority: ${highPriority}

Tasks:
${taskList}`;

    // Use text2text model (more reliable)
    const response = await hf.textGeneration({
      model: 'google/flan-t5-base',
      inputs: prompt,
      parameters: {
        max_new_tokens: 100,
      },
    });

    return {
      success: true,
      summary: response.generated_text.trim(),
    };

  } catch (error) {
    console.error('AI Service Error:', error);
    
    // Fallback: Generate simple summary without AI
    const total = tasks.length;
    const highPriority = tasks.filter(t => t.priority === 'high').length;
    const todoCount = tasks.filter(t => t.status === 'todo').length;
    
    return {
      success: true,
      summary: `Project "${projectName}" has ${total} tasks. ${highPriority} are high priority. ${todoCount} tasks need to be started.`,
    };
  }
};