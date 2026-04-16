import { useAuthStore } from '../../store/authStore';

function Navbar() {
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
      <div className="px-4 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center">
          <img src="/logo.png" alt="TeamSync" className="h-12" />

        </div>

        {/* Right Side - User & Logout */}
        <div className="flex items-center gap-8">
          
          {/* User Name */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <span className="text-gray-700 hidden sm:block">
              {user?.name || 'User'}
            </span>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-1.5 rounded text-sm hover:bg-red-600"
          >
            Logout
          </button>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;