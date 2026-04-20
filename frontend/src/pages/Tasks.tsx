/**
 * TASKS PAGE - KANBAN BOARD
 * 
 * What: Shows tasks in 3 columns
 * Columns: Todo | In Progress | Done
 */

import { useState, useEffect } from 'react';
import { getTasks, updateTask } from '../services/taskService';
import type { Task } from '../types';
import toast from 'react-hot-toast';
import CreateTaskModal from '../components/features/CreateTaskModal';
import TaskCard from '../components/features/TaskCard';

function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (taskId: string, newStatus: 'todo' | 'in-progress' | 'done') => {
    try {
      await updateTask(taskId, { status: newStatus });
      setTasks(tasks.map(task => 
        (task._id || task.id) === taskId 
          ? { ...task, status: newStatus } 
          : task
      ));
      toast.success('Task updated!');
    } catch (error) {
      toast.error('Failed to update task');
    }
  };

  // Filter tasks by status
  const todoTasks = tasks.filter(task => task.status === 'todo');
  const inProgressTasks = tasks.filter(task => task.status === 'in-progress');
  const doneTasks = tasks.filter(task => task.status === 'done');

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading tasks...</div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Tasks</h1>
          <p className="text-gray-600 text-sm">Manage your tasks</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-purple-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-600"
        >
          + New Task
        </button>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* TODO Column */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">📋</span>
            <h2 className="font-semibold text-gray-700">To Do</h2>
            <span className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full">
              {todoTasks.length}
            </span>
          </div>
          <div className="space-y-3">
            {todoTasks.map(task => (
              <TaskCard 
                key={task._id || task.id} 
                task={task} 
                onStatusChange={handleStatusChange}
              />
            ))}
            {todoTasks.length === 0 && (
              <p className="text-gray-400 text-sm text-center py-4">No tasks</p>
            )}
          </div>
        </div>

        {/* IN PROGRESS Column */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">🔄</span>
            <h2 className="font-semibold text-gray-700">In Progress</h2>
            <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">
              {inProgressTasks.length}
            </span>
          </div>
          <div className="space-y-3">
            {inProgressTasks.map(task => (
              <TaskCard 
                key={task._id || task.id} 
                task={task} 
                onStatusChange={handleStatusChange}
              />
            ))}
            {inProgressTasks.length === 0 && (
              <p className="text-gray-400 text-sm text-center py-4">No tasks</p>
            )}
          </div>
        </div>

        {/* DONE Column */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">✅</span>
            <h2 className="font-semibold text-gray-700">Done</h2>
            <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full">
              {doneTasks.length}
            </span>
          </div>
          <div className="space-y-3">
            {doneTasks.map(task => (
              <TaskCard 
                key={task._id || task.id} 
                task={task} 
                onStatusChange={handleStatusChange}
              />
            ))}
            {doneTasks.length === 0 && (
              <p className="text-gray-400 text-sm text-center py-4">No tasks</p>
            )}
          </div>
        </div>
      </div>

      {/* Create Task Modal */}
      {showModal && (
        <CreateTaskModal
          onClose={() => setShowModal(false)}
          onCreated={(newTask: Task) => {
            setTasks([...tasks, newTask]);
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
}

export default Tasks;