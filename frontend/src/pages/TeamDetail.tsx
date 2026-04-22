import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTeam, deleteTeam, addMember } from '../services/teamService';
import type { Team } from '../types';
import toast from 'react-hot-toast';

function TeamDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [team, setTeam] = useState<Team | null>(null);
  const [loading, setLoading] = useState(true);
  const [showInvite, setShowInvite] = useState(false);
  const [email, setEmail] = useState('');
  const [inviting, setInviting] = useState(false);

  useEffect(() => {
    if (id) {
      fetchTeam();
    }
  }, [id]);

  const fetchTeam = async () => {
    try {
      setLoading(true);
      const data = await getTeam(id!);
      setTeam(data);
    } catch (error) {
      toast.error('Failed to load team');
      navigate('/teams');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this team?')) return;

    try {
      await deleteTeam(id!);
      toast.success('Team deleted');
      navigate('/teams');
    } catch (error) {
      toast.error('Failed to delete team');
    }
  };

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast.error('Email is required');
      return;
    }

    try {
      setInviting(true);
      const updatedTeam = await addMember(id!, email.trim());
      setTeam(updatedTeam);
      setEmail('');
      setShowInvite(false);
      toast.success('Member added!');
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Failed to add member');
    } finally {
      setInviting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading team...</div>
      </div>
    );
  }

  if (!team) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Team not found</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/teams')}
            className="text-gray-500 hover:text-gray-700"
          >
            ← Back
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold text-xl">
              {team.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">{team.name}</h1>
              <p className="text-gray-500 text-sm">{team.description || 'No description'}</p>
            </div>
          </div>
        </div>

        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600"
        >
          Delete Team
        </button>
      </div>

      {/* Members Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Members ({team.members?.length || 0})
          </h2>
          <button
            onClick={() => setShowInvite(!showInvite)}
            className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
          >
            + Add Member
          </button>
        </div>

        {/* Invite Form */}
        {showInvite && (
          <form onSubmit={handleInvite} className="mb-4 p-4 bg-gray-50 rounded-lg">
            <label className="block text-gray-700 text-sm mb-1">Member Email</label>
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter email address"
              />
              <button
                type="submit"
                disabled={inviting}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:bg-green-300"
              >
                {inviting ? 'Adding...' : 'Add'}
              </button>
              <button
                type="button"
                onClick={() => setShowInvite(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Members List */}
        {team.members && team.members.length > 0 ? (
          <div className="space-y-3">
            {team.members.map((member) => (
              <div
                key={member.user?.id || Math.random()}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">
                    {member.user?.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{member.user?.name || 'Unknown'}</p>
                    <p className="text-gray-500 text-xs">{member.user?.email || ''}</p>
                  </div>
                </div>
                <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                  {member.role}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No members yet</p>
        )}
      </div>
    </div>
  );
}

export default TeamDetail;