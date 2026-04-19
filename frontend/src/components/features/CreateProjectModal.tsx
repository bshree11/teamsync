import { useState, useEffect } from 'react';
import { createProject } from '../../services/projectService';
import { getTeams } from '../../services/teamService';
import type { Project, Team } from '../../types';
import toast from 'react-hot-toast';

interface CreateProjectModalProps {
  onClose: () => void;
  onCreated: (project: Project) => void;
}

function CreateProjectModal({ onClose, onCreated }: CreateProjectModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [teamId, setTeamId] = useState('');
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingTeams, setLoadingTeams] = useState(true);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const data = await getTeams();
      setTeams(data);
      if (data.length > 0) {
        setTeamId(data[0]._id || data[0].id);
      }
    } catch (error) {
      toast.error('Failed to load teams');
    } finally {
      setLoadingTeams(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error('Project name is required');
      return;
    }

    if (!teamId) {
      toast.error('Please select a team');
      return;
    }

    try {
      setLoading(true);
     const newProject = await createProject({ name, description, teamId });
      toast.success('Project created!');
      onCreated(newProject);
    } catch (error) {
      toast.error('Failed to create project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      />

      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative z-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Create New Project</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-1">Project Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter project name"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-1">Team</label>
            {loadingTeams ? (
              <div className="text-gray-500 text-sm">Loading teams...</div>
            ) : teams.length === 0 ? (
              <div className="text-red-500 text-sm">No teams found. Create a team first.</div>
            ) : (
              <select
                value={teamId}
                onChange={(e) => setTeamId(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {teams.map((team) => (
                  <option key={team._id || team.id} value={team._id || team.id}>
                    {team.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm mb-1">Description (optional)</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter project description"
              rows={3}
            />
          </div>

          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || teams.length === 0}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-green-300"
            >
              {loading ? 'Creating...' : 'Create Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateProjectModal;