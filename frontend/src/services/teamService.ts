/**
 * TEAM SERVICE
 * 
 * What: Functions for Teams API calls
 * Why: Keeps API logic separate from UI components
 */

import api from './api';
import type { Team } from '../types';

// Response type for single team
interface TeamResponse {
  success: boolean;
  team: Team;
}

// Response type for multiple teams
interface TeamsResponse {
  success: boolean;
  teams: Team[];
}

/**
 * GET ALL TEAMS
 * User's teams (owned + member of)
 */
export const getTeams = async (): Promise<Team[]> => {
  const response = await api.get<TeamsResponse>('/teams');
  return response.data.teams;
};

/**
 * GET SINGLE TEAM
 */
export const getTeam = async (id: string): Promise<Team> => {
  const response = await api.get<TeamResponse>(`/teams/${id}`);
  return response.data.team;
};

/**
 * CREATE TEAM
 */
export const createTeam = async (data: { 
  name: string; 
  description?: string 
}): Promise<Team> => {
  const response = await api.post<TeamResponse>('/teams', data);
  return response.data.team;
};

/**
 * UPDATE TEAM
 */
export const updateTeam = async (
  id: string, 
  data: { name?: string; description?: string }
): Promise<Team> => {
  const response = await api.put<TeamResponse>(`/teams/${id}`, data);
  return response.data.team;
};

/**
 * DELETE TEAM
 */
export const deleteTeam = async (id: string): Promise<void> => {
  await api.delete(`/teams/${id}`);
};

/**
 * ADD MEMBER TO TEAM
 */
export const addMember = async (
  teamId: string, 
  email: string,
  role: 'admin' | 'member' = 'member'
): Promise<Team> => {
  const response = await api.post<TeamResponse>(`/teams/${teamId}/members`, { 
    email, 
    role 
  });
  return response.data.team;
};

/**
 * REMOVE MEMBER FROM TEAM
 */
export const removeMember = async (
  teamId: string, 
  memberId: string
): Promise<Team> => {
  const response = await api.delete<TeamResponse>(`/teams/${teamId}/members/${memberId}`);
  return response.data.team;
};