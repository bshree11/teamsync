import { useAuthStore } from '../store/authStore';
import { Link } from 'react-router-dom';

function Dashboard() {
  const { user } = useAuthStore();

  // Placeholder stats (we'll connect to API later)
  const stats = [
    { label: 'Teams', value: 0, color: 'bg-blue-500', path: '/teams' },
    { label: 'Projects', value: 0, color: 'bg-green-500', path: '/projects' },
    { label: 'Tasks', value: 0, color: 'bg-yellow-500', path: '/tasks' },
    { label: 'Completed', value: 0, color: 'bg-purple-500', path: '/tasks' },
  ];

  return (
    <div>
      {/* Welcome Message */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-800">
          Welcome back, {user?.name || 'User'}! 👋
        </h1>
        <p className="text-gray-600 text-sm mt-1">
          Here's what's happening with your teams today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            to={stat.path}
            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center text-white text-sm font-bold mb-3`}>
              {stat.value}
            </div>
            <h3 className="text-gray-600 text-sm font-medium">{stat.label}</h3>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h2 className="text-base font-semibold text-gray-800 mb-3">
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-2">
          <Link
            to="/teams"
            className="bg-blue-500 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-blue-600"
          >
            + New Team
          </Link>
          <Link
            to="/projects"
            className="bg-green-500 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-green-600"
          >
            + New Project
          </Link>
          <Link
            to="/tasks"
            className="bg-yellow-500 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-yellow-600"
          >
            + New Task
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;