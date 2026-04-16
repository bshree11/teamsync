import { Link, useLocation } from 'react-router-dom';

function Sidebar() {
  const location = useLocation();

  // Menu items
  // Menu items - smaller icons
const menuItems = [
  { name: 'Dashboard', path: '/dashboard', icon: '📊' },
  { name: 'Teams', path: '/teams', icon: '👥' },
  { name: 'Projects', path: '/projects', icon: '📁' },
  { name: 'Tasks', path: '/tasks', icon: '✅' },
  { name: 'Profile', path: '/profile', icon: '👤' },
];

  return (
    <aside className="bg-white w-64 min-h-screen border-r border-gray-200 fixed left-0 top-16 pt-4">
      <nav className="px-4">
        {menuItems.map((item) => (
            <Link
  key={item.path}
  to={item.path}
  className={`flex items-center gap-2 px-3 py-2 rounded-lg mb-1 text-sm transition-colors ${
    location.pathname === item.path
      ? 'bg-blue-50 text-blue-600'
      : 'text-gray-600 hover:bg-gray-50'
  }`}
>
  <span className="text-base">{item.icon}</span>
  <span className="font-medium">{item.name}</span>
</Link>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;