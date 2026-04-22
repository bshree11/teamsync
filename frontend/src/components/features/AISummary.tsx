/**
 * AI SUMMARY COMPONENT
 * 
 * What: Shows AI-powered task insights
 * Used on: Dashboard page
 */

import { useState, useEffect } from 'react';
import { getTasks } from '../../services/taskService';
import { generateSummary, type AISummary as AISummaryType } from '../../services/aiService';
import toast from 'react-hot-toast';

function AISummary() {
  const [summary, setSummary] = useState<AISummaryType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAndGenerateSummary();
  }, []);

  const fetchAndGenerateSummary = async () => {
    try {
      setLoading(true);
      const tasks = await getTasks();
      const summaryData = await generateSummary(tasks);
      setSummary(summaryData);
    } catch (error) {
      toast.error('Failed to generate summary');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="text-gray-500 text-center">🤖 AI is analyzing your tasks...</div>
      </div>
    );
  }

  if (!summary) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-slate-700 to-slate-800 rounded-lg shadow-sm p-6 text-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🤖</span>
          <h2 className="text-lg font-semibold">AI Summary</h2>
        </div>
        <button
          onClick={fetchAndGenerateSummary}
          disabled={loading}
          className="text-white/80 hover:text-white text-sm"
        >
          🔄 Refresh
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-4 mb-4">
        <div className="bg-white/20 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold">{summary.totalTasks}</div>
          <div className="text-xs text-white/80">Total</div>
        </div>
        <div className="bg-white/20 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold">{summary.todoCount}</div>
          <div className="text-xs text-white/80">To Do</div>
        </div>
        <div className="bg-white/20 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold">{summary.inProgressCount}</div>
          <div className="text-xs text-white/80">In Progress</div>
        </div>
        <div className="bg-white/20 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold">{summary.doneCount}</div>
          <div className="text-xs text-white/80">Done</div>
        </div>
      </div>

      {/* Completion Rate */}
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span>Completion Rate</span>
          <span>{summary.completionRate}%</span>
        </div>
        <div className="bg-white/20 rounded-full h-2">
          <div
            className="bg-white rounded-full h-2 transition-all"
            style={{ width: `${summary.completionRate}%` }}
          />
        </div>
      </div>

      {/* AI Suggestion */}
      <div className="bg-white/10 rounded-lg p-3">
        <div className="flex items-center gap-2 mb-1">
          <span>💡</span>
          <span className="text-sm font-medium">AI Suggestion</span>
        </div>
        <p className="text-sm">{summary.suggestion}</p>
      </div>

      {/* High Priority Tasks */}
      {summary.highPriorityTasks.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium mb-2">🔴 High Priority</h3>
          <ul className="space-y-1">
            {summary.highPriorityTasks.slice(0, 3).map((task, index) => (
              <li key={index} className="text-sm text-white/90">
                • {task}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default AISummary;