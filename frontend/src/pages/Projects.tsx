import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProjects } from '../services/projectService';
import type { Project } from '../types';
import toast from 'react-hot-toast';
import CreateProjectModal from '../components/features/CreateProjectModal';

function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await getProjects();
      setProjects(data);
    } catch (error) {
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-600';
      case 'completed':
        return 'bg-blue-100 text-blue-600';
      case 'archived':
        return 'bg-gray-100 text-gray-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading projects...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Projects</h1>
          <p className="text-gray-600 text-sm">Manage your projects</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-600"
        >
          + New Project
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <p className="text-gray-500 mb-4">No projects yet</p>
          <button
            onClick={() => setShowModal(true)}
            className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-600"
          >
            Create your first project
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <Link
              key={project.id}
              to={`/projects/${project.id}`}
              className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600 font-bold mb-3">
                {project.name.charAt(0).toUpperCase()}
              </div>

              <h3 className="font-medium text-gray-800">{project.name}</h3>
              <p className="text-gray-500 text-sm mt-1">
                {project.description || 'No description'}
              </p>

              <div className="mt-3">
                <span className={`text-xs px-2 py-1 rounded ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {showModal && (
        <CreateProjectModal
          onClose={() => setShowModal(false)}
          onCreated={(newProject: Project) => {
            setProjects([...projects, newProject]);
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
}

export default Projects;