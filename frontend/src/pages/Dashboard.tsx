/**
 * DASHBOARD PAGE
 * 
 * What: Main landing page after login
 * Shows: Welcome message, stats, AI Summary
 */

import { useAuthStore } from '../store/authStore';
import { Link } from 'react-router-dom';
import AISummary from '../components/features/AISummary';

function Dashboard() {
  const { user } = useAuthStore();

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-800">
          Welcome back, {user?.name || 'User'}! 👋
        </h1>
        <p className="text-gray-600 text-sm">Here's your work overview</p>
      </div>

      {/* AI Summary */}
      <div className="mb-6">
        <AISummary />
      </div>

      {/* Quick Actions */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/teams"
            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="text-2xl mb-2">👥</div>
            <h3 className="font-medium text-gray-800">Teams</h3>
            <p className="text-gray-500 text-sm">Manage your teams</p>
          </Link>

          <Link
            to="/projects"
            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="text-2xl mb-2">📁</div>
            <h3 className="font-medium text-gray-800">Projects</h3>
            <p className="text-gray-500 text-sm">View all projects</p>
          </Link>

          <Link
            to="/tasks"
            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="text-2xl mb-2">✅</div>
            <h3 className="font-medium text-gray-800">Tasks</h3>
            <p className="text-gray-500 text-sm">Kanban board</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;