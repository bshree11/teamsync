import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProject, deleteProject, updateProject } from '../services/projectService';
import { getTeam } from '../services/teamService';
import type { Project, Team } from '../types';
import toast from 'react-hot-toast';

function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [team, setTeam] = useState<Team | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchProject();
    }
  }, [id]);

  const fetchProject = async () => {
    try {
      setLoading(true);
      const data = await getProject(id!);
      setProject(data);
      
      // Fetch team details
      const teamId = typeof data.team === 'object' ? (data.team._id || data.team.id) : data.team;
      if (teamId) {
        try {
          const teamData = await getTeam(teamId);
          setTeam(teamData);
        } catch {
          // Team fetch failed, that's okay
        }
      }
    } catch (error) {
      toast.error('Failed to load project');
      navigate('/projects');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      await deleteProject(id!);
      toast.success('Project deleted');
      navigate('/projects');
    } catch (error) {
      toast.error('Failed to delete project');
    }
  };

  const handleStatusChange = async (newStatus: 'active' | 'completed' | 'archived') => {
    try {
      const updated = await updateProject(id!, { status: newStatus });
      setProject(updated);
      toast.success('Status updated');
    } catch (error) {
      toast.error('Failed to update status');
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
        <div className="text-gray-500">Loading project...</div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Project not found</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/projects')}
            className="text-gray-500 hover:text-gray-700"
          >
            ← Back
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600 font-bold text-xl">
              {project.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">{project.name}</h1>
              <p className="text-gray-500 text-sm">{project.description || 'No description'}</p>
            </div>
          </div>
        </div>

        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600"
        >
          Delete Project
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Status</h2>
          <div className="flex gap-2">
            {['active', 'completed', 'archived'].map((status) => (
              <button
                key={status}
                onClick={() => handleStatusChange(status as 'active' | 'completed' | 'archived')}
                className={`px-3 py-1 rounded text-sm capitalize ${
                  project.status === status
                    ? getStatusColor(status)
                    : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Team</h2>
          <p className="text-gray-600">
            {team ? team.name : 'Loading...'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetail;