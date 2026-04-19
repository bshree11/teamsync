/**
 * CREATE TEAM MODAL
 * 
 * What: Popup form to create a new team
 * Props:
 *   - onClose: Function to close modal
 *   - onCreated: Function called after team created
 */

import { useState } from 'react';
import { createTeam } from '../../services/teamService';
import type { Team } from '../../types';
import toast from 'react-hot-toast';

interface CreateTeamModalProps {
  onClose: () => void;
  onCreated: (team: Team) => void;
}

function CreateTeamModal({ onClose, onCreated }: CreateTeamModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error('Team name is required');
      return;
    }

    try {
      setLoading(true);
      const newTeam = await createTeam({ name, description });
      toast.success('Team created!');
      onCreated(newTeam);
    } catch (error) {
      toast.error('Failed to create team');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Dark Background */}
      <div 
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      />

      {/* Modal Box */}
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Create New Team</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Name Input */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-1">Team Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter team name"
            />
          </div>

          {/* Description Input */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm mb-1">Description (optional)</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter team description"
              rows={3}
            />
          </div>

          {/* Buttons */}
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
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
            >
              {loading ? 'Creating...' : 'Create Team'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateTeamModal;