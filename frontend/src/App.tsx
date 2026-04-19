import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/layout/Layout";
import { useAuthStore } from "./store/authStore";
import Teams from "./pages/Teams";
import TeamDetail from "./pages/TeamDetail";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";

function App() {
  const { isAuthenticated } = useAuthStore();

  return (
    <BrowserRouter>
      <Toaster position="bottom-left" />

      <Routes>
        {/* Public Routes */}
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

        {/* Protected Routes - with Layout */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <Layout>
                <Dashboard />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Placeholder routes for other pages */}

        <Route
          path="/teams"
          element={
            isAuthenticated ? (
              <Layout>
                <Teams />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/teams/:id"
          element={
            isAuthenticated ? (
              <Layout>
                <TeamDetail />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/projects"
          element={
            isAuthenticated ? (
              <Layout>
                <Projects />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/projects/:id"
          element={
            isAuthenticated ? (
              <Layout>
                <ProjectDetail />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/tasks"
          element={
            isAuthenticated ? (
              <Layout>
                <div className="text-2xl font-bold">
                  Tasks Page (Coming Day 12)
                </div>
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/profile"
          element={
            isAuthenticated ? (
              <Layout>
                <div className="text-2xl font-bold">
                  Profile Page (Coming Day 13)
                </div>
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Default Route */}
        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
