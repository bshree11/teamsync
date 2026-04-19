/**
 * TEAMS PAGE
 * 
 * What: Shows all teams user belongs to
 * Features:
 *   - List of team cards
 *   - Create team button
 *   - Loading & error states
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTeams } from '../services/teamService';
import type { Team } from '../types';
import toast from 'react-hot-toast';
import CreateTeamModal from '../components/features/CreateTeamModal';

function Teams() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // Fetch teams on page load
  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      setLoading(true);
      const data = await getTeams();
      setTeams(data);
    } catch (error) {
      toast.error('Failed to load teams');
    } finally {
      setLoading(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading teams...</div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Teams</h1>
          <p className="text-gray-600 text-sm">Manage your teams</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600"
        >
          + New Team
        </button>
      </div>

      {/* Teams Grid */}
      {teams.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <p className="text-gray-500 mb-4">No teams yet</p>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600"
          >
            Create your first team
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {teams.map((team) => (
            <Link
              key={team.id}
              to={`/teams/${team.id}`}
              className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Team Icon */}
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold mb-3">
                {team.name.charAt(0).toUpperCase()}
              </div>
              
              {/* Team Info */}
              <h3 className="font-medium text-gray-800">{team.name}</h3>
              <p className="text-gray-500 text-sm mt-1">
                {team.description || 'No description'}
              </p>
              
              {/* Members Count */}
              <div className="mt-3 text-xs text-gray-400">
               {team.members?.length || 0} {team.members?.length === 1 ? 'member' : 'members'}
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Create Team Modal - We'll build this next */}
      {showModal && (
        <CreateTeamModal
          onClose={() => setShowModal(false)}
          onCreated={(newTeam) => {
            setTeams([...teams, newTeam]);
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
}

export default Teams;