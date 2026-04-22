import { useState } from "react";
import {useNavigate, Link} from 'react-router-dom';
import { login } from '../services/authService';
import { useAuthStore } from "../store/authStore";
import { connectSocket } from '../services/socket';

function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { setUser } = useAuthStore();


const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');

  if (!email || !password) {
    setError('Please fill in all fields');
    return;
  }

  try {
    setLoading(true);
    // Convert email to lowercase before sending
    const result = await login(email.toLowerCase(), password);

    if (result.success) {
      setUser(result.user, result.token);
      connectSocket(result.user.id);
      navigate('/dashboard');
    }
  } catch (err: any) {
    setError(err.response?.data?.error || 'Login Failed');
  } finally {
    setLoading(false);
  }
};

return(
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">

        {/* Title  */}
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login to TeamSync
        </h1>

        {error &&(
            <div className="bg-red-100 text-red-600 p-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          
          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>

                    {/* Password Input */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>

   {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 disabled:bg-blue-300"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        
        {/* Register Link */}
        <p className="text-center mt-4 text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register here
          </Link>
        </p>
        
      </div>
    </div>


  );
}

export default Login;