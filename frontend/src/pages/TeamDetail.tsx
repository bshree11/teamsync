/**
 * TEAM DETAIL PAGE
 * 
 * What: Shows single team with members
 * URL: /teams/:id
 */

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTeam, deleteTeam } from '../services/teamService';
import type { Team } from '../types';
import toast from 'react-hot-toast';

function TeamDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [team, setTeam] = useState<Team | null>(null);
  const [loading, setLoading] = useState(true);

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
          {/* Back Button */}
          <button
            onClick={() => navigate('/teams')}
            className="text-gray-500 hover:text-gray-700"
          >
            ← Back
          </button>
          
          {/* Team Icon & Name */}
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

        {/* Delete Button */}
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600"
        >
          Delete Team
        </button>
      </div>

      {/* Members Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Members ({team.members?.length || 0})
        </h2>

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