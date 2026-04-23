/* PROJECT SERVICE
 What: Functions for projects API calls
 Why: keeps API logic separate from UI components
 */

 import api from './api';
 import type { Project } from '../types';

 //response type for single project
 interface ProjectResponse{
    success: boolean;
    project: Project;
 }

 //response type for multiple projects
 interface ProjectsResponse{
   success: boolean;
   projects: Project[];
}


 // GET ALL PROJECTS  - returns project user has access to 
 export const getProjects = async (): Promise<Project[]> =>{
    const response = await api.get<ProjectsResponse>('/projects');

    return response.data.projects;
 };

 //GET SINGLE PROJECT
 export const getProject = async (id: string): Promise<Project> =>{
    const response = await api.get<ProjectResponse>(`/projects/${id}`);
    return response.data.project;
 };

 //CREATE PROJECT
 export const createProject = async (data: {
  name: string;
  description?: string;
  teamId: string;  // ← Correct name
  status?: 'active' | 'completed' | 'archived';
}): Promise<Project> => {
  const response = await api.post<ProjectResponse>('/projects', data);
  return response.data.project;
};


 //UPDATE PROJECT
 export const updateProject = async(
    id:string,
    data: {
        name?: string;
        description?: string;
        status?: 'active'| 'completed'|'archived';
    }
 ): Promise<Project> =>{
    const response = await api.put<ProjectResponse>(`/projects/${id}`, data);
    return response.data.project;
 };

 // DELETE PROJECT
export const deleteProject = async (id: string): Promise<void> => {
  await api.delete(`/projects/${id}`);
};



