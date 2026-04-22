/**
 * TEAM SERVICE
 * 
 * What: Handles team operations
 */

import Team from '../models/Team';
import User from '../models/User';

interface CreateTeamInput {
  name: string;
  description?: string;
}

interface UpdateTeamInput {
  name?: string;
  description?: string;
}

interface ServiceResult {
  success: boolean;
  team?: any;
  teams?: any[];
  error?: string;
}

/**
 * CREATE A TEAM
 */
export const createTeam = async (
  userId: string,
  input: CreateTeamInput
): Promise<ServiceResult> => {
  const { name, description } = input;

  const team = await Team.create({
    name,
    description: description || '',
    owner: userId,
    members: [{ user: userId, role: 'owner', joinedAt: new Date() }],
  });

  return {
    success: true,
    team: {
      id: team._id,
      name: team.name,
      description: team.description,
      owner: team.owner,
      members: team.members,
      createdAt: team.createdAt,
    },
  };
};

/**
 * GET USER'S TEAMS
 */
export const getUserTeams = async (userId: string): Promise<ServiceResult> => {
  const teams = await Team.find({ 'members.user': userId })
    .populate('owner', 'name email avatar')
    .populate('members.user', 'name email avatar');

  return {
    success: true,
    teams: teams.map((team) => ({
      id: team._id,
      name: team.name,
      description: team.description,
      owner: team.owner,
      members: team.members,
      createdAt: team.createdAt,
    })),
  };
};

/**
 * GET ONE TEAM BY ID
 */
export const getTeamById = async (
  teamId: string,
  userId: string
): Promise<ServiceResult> => {
  const team = await Team.findById(teamId)
    .populate('owner', 'name email avatar')
    .populate('members.user', 'name email avatar');

  if (!team) {
    return {
      success: false,
      error: 'Team not found',
    };
  }

  const isMember = team.members.some(
    (member) => member.user._id.toString() === userId
  );

  if (!isMember) {
    return {
      success: false,
      error: 'You are not a member of this team',
    };
  }

  return {
    success: true,
    team: {
      id: team._id,
      name: team.name,
      description: team.description,
      owner: team.owner,
      members: team.members,
      createdAt: team.createdAt,
    },
  };
};

/**
 * UPDATE TEAM
 */
export const updateTeam = async (
  teamId: string,
  userId: string,
  input: UpdateTeamInput
): Promise<ServiceResult> => {
  const team = await Team.findById(teamId);

  if (!team) {
    return {
      success: false,
      error: 'Team not found',
    };
  }

  const member = team.members.find((m) => m.user.toString() === userId);

  if (!member || (member.role !== 'owner' && member.role !== 'admin')) {
    return {
      success: false,
      error: 'Only owner or admin can update team',
    };
  }

  if (input.name) team.name = input.name;
  if (input.description !== undefined) team.description = input.description;

  await team.save();

  return {
    success: true,
    team: {
      id: team._id,
      name: team.name,
      description: team.description,
      owner: team.owner,
      members: team.members,
    },
  };
};

/**
 * DELETE TEAM
 */
export const deleteTeam = async (
  teamId: string,
  userId: string
): Promise<ServiceResult> => {
  const team = await Team.findById(teamId);

  if (!team) {
    return {
      success: false,
      error: 'Team not found',
    };
  }

  if (team.owner.toString() !== userId) {
    return {
      success: false,
      error: 'Only owner can delete team',
    };
  }

  await Team.findByIdAndDelete(teamId);

  return {
    success: true,
  };
};

/**
 * ADD MEMBER TO TEAM
 */
export const addMember = async (
  teamId: string,
  userId: string,
  newMemberId: string,
  role: 'admin' | 'member' = 'member'
): Promise<ServiceResult> => {
  const team = await Team.findById(teamId);

  if (!team) {
    return {
      success: false,
      error: 'Team not found',
    };
  }

  const currentMember = team.members.find((m) => m.user.toString() === userId);

  if (!currentMember || (currentMember.role !== 'owner' && currentMember.role !== 'admin')) {
    return {
      success: false,
      error: 'Only owner or admin can add members',
    };
  }

  const newUser = await User.findById(newMemberId);

  if (!newUser) {
    return {
      success: false,
      error: 'User not found',
    };
  }

  const alreadyMember = team.members.some((m) => m.user.toString() === newMemberId);

  if (alreadyMember) {
    return {
      success: false,
      error: 'User is already a member',
    };
  }

  // Add member WITH joinedAt
  team.members.push({
    user: newMemberId as any,
    role,
    joinedAt: new Date(),
  });

  await team.save();

  const updatedTeam = await Team.findById(teamId)
    .populate('owner', 'name email avatar')
    .populate('members.user', 'name email avatar');

  return {
    success: true,
    team: {
      id: updatedTeam!._id,
      name: updatedTeam!.name,
      description: updatedTeam!.description,
      owner: updatedTeam!.owner,
      members: updatedTeam!.members,
    },
  };
};

/**
 * REMOVE MEMBER FROM TEAM
 */
export const removeMember = async (
  teamId: string,
  userId: string,
  memberToRemoveId: string
): Promise<ServiceResult> => {
  const team = await Team.findById(teamId);

  if (!team) {
    return {
      success: false,
      error: 'Team not found',
    };
  }

  const currentMember = team.members.find((m) => m.user.toString() === userId);

  if (!currentMember || (currentMember.role !== 'owner' && currentMember.role !== 'admin')) {
    return {
      success: false,
      error: 'Only owner or admin can remove members',
    };
  }

  if (team.owner.toString() === memberToRemoveId) {
    return {
      success: false,
      error: 'Cannot remove the team owner',
    };
  }

  team.members = team.members.filter((m) => m.user.toString() !== memberToRemoveId);

  await team.save();

  return {
    success: true,
  };
};