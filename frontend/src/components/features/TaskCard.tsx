/**
 * TASK CARD
 * 
 * What: Single task card for Kanban board
 * Shows: Title, priority badge, project name
 */

import type { Task } from '../../types';

interface TaskCardProps {
  task: Task;
  onStatusChange: (taskId: string, newStatus: 'todo' | 'in-progress' | 'done') => void;
}

function TaskCard({ task, onStatusChange }: TaskCardProps) {
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-600';
      case 'medium':
        return 'bg-yellow-100 text-yellow-600';
      case 'low':
        return 'bg-green-100 text-green-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return '🔴';
      case 'medium':
        return '🟡';
      case 'low':
        return '🟢';
      default:
        return '⚪';
    }
  };

  const getNextStatus = (currentStatus: string): 'todo' | 'in-progress' | 'done' | null => {
    switch (currentStatus) {
      case 'todo':
        return 'in-progress';
      case 'in-progress':
        return 'done';
      default:
        return null;
    }
  };

  const nextStatus = getNextStatus(task.status);

  return (
    <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      {/* Priority Badge */}
      <div className="flex items-center justify-between mb-2">
        <span className={`text-xs px-2 py-1 rounded ${getPriorityColor(task.priority)}`}>
          {getPriorityIcon(task.priority)} {task.priority}
        </span>
      </div>

      {/* Title */}
      <h4 className="font-medium text-gray-800 mb-2">{task.title}</h4>

      {/* Description */}
      {task.description && (
        <p className="text-gray-500 text-sm mb-3 line-clamp-2">{task.description}</p>
      )}

      {/* Move Button */}
      {nextStatus && (
        <button
          onClick={() => onStatusChange(task._id || task.id, nextStatus)}
          className="text-xs text-purple-600 hover:text-purple-800"
        >
          Move to {nextStatus === 'in-progress' ? 'In Progress' : 'Done'} →
        </button>
      )}
    </div>
  );
}

export default TaskCard;