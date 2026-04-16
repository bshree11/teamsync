import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useAuthStore } from "./store/authStore";

function App() {
  const { isAuthenticated } = useAuthStore();

  return (
    <BrowserRouter>
      <Toaster position="bottom-right" />

      <Routes>
        {/* Public routes  */}
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />}
        />

        <Route
          path="/register"
          element={
            isAuthenticated ? <Navigate to="/dashboard" /> : <Register />
          }
        />

        {/* Dashboard - temporary placeholder */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-3xl font-bold text-gray-800">
                    Welcome to Dashboard!
                  </h1>
                  <p className="text-gray-600 mt-2">You are logged in.</p>
                  <button
                    onClick={() => useAuthStore.getState().logout()}
                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Default Route - redirect to login or dashboard */}
        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
