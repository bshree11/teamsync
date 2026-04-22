// PROJECT SERVICE - handles project operations

import Project from '../models/Project';
import Team from '../models/Team';

interface CreateProjectInput{
    name: string;
    description?: string;
    teamId: string;
}
interface UpdateProjectInput{
    name?: string;
    description?: string;
    status?: 'active'| 'completed'| 'archived';
}

interface ServiceResult{
    success:boolean;
    project?:any;
    projects?: any[];
    error? : string;
}

//create a project
 export const createProject = async(
    userId: string,
    input: CreateProjectInput
 ): Promise<ServiceResult> =>{
    const{ name, description, teamId} = input;

    //check if team exists and user is a member
    const team = await Team.findById(teamId);

    if(!team){
        return{
            success:false,
            error: 'Team not found',
        };
    }
    const isMember = team.members.some(
        (m)=> m.user.toString() === userId
    );
    if(!isMember){
        return{
            success:false,
            error:'You are not a member of this team',
        };
    }

    //create project
    const project = await Project.create({
        name,
        description:description || '',
        team:teamId,
        members:[userId],
    });
    return{
        success:true,
        project:{
            id: project._id,
            name:project.name,
            description: project.description,
            team: project.team,
            members: project.members,
            createdAt: project.createdAt,
        },
    };
 };

 //GET USER'S PROJECT
 export const getUserProjects= async(userId:string): Promise<ServiceResult> => {
    //find projects where user is a member
    const projects = await Project.find({members: userId})
    .populate('team', 'name')
    .populate('members', 'name email avatar');
    return{
        success:true,
        projects:projects.map((project)=>({
            id:project._id,
            name: project.name,
            description: project.description,
            team: project.team,
            status: project.status,
            members: project.members,
            createdAt: project.createdAt,

        })),
    };
 };

 //GET ONE PROJECT

 export const getProjectById = async(
    projectId:string,
    userId: string
 ): Promise<ServiceResult> =>{
    const project = await Project.findById(projectId)
    .populate('team','name')
    .populate('members', 'name email avatar');

    if(!project){
        return{
            success:false,
            error: 'Project not found',
        };
    }

    //check if user is a member
    const isMember = project.members.some((member:any) =>member._id.toString() === userId);

    if(!isMember){
        return{
            success:false,
            error: 'You are not a member of this project',
        };
    
    }
    return{
        success: true,
        project:{
            id: project._id,
            name:project.name,
            description: project.description,
            team: project.team,
            status: project.status,
            members : project.members,
            createdAt: project.createdAt,
        },
    };
 };

 //UPDATE PROJECT
export const updateProject = async (
  projectId: string,
  userId: string,
  input: UpdateProjectInput
): Promise<ServiceResult> => {
  const project = await Project.findById(projectId);

  if (!project) {
    return {
      success: false,
      error: 'Project not found',
    };
  }

  // Check if user is a member
  const isMember = project.members.some(
    (member) => member.toString() === userId
  );

  if (!isMember) {
    return {
      success: false,
      error: 'You are not a member of this project',
    };
  }

  // Update fields
  if (input.name) project.name = input.name;
  if (input.description !== undefined) project.description = input.description;
  if (input.status) project.status = input.status;

  await project.save();

  return {
    success: true,
    project: {
      id: project._id,
      name: project.name,
      description: project.description,
      team: project.team,
      status: project.status,
      members: project.members,
    },
  };
};

//DELETE PROJECT
export const deleteProject = async (
  projectId: string,
  userId: string
): Promise<ServiceResult> => {
  const project = await Project.findById(projectId);

  if (!project) {
    return {
      success: false,
      error: 'Project not found',
    };
  }

  // Check if user is a member
  const isMember = project.members.some(
    (member) => member.toString() === userId
  );

  if (!isMember) {
    return {
      success: false,
      error: 'You are not a member of this project',
    };
  }

  await Project.findByIdAndDelete(projectId);

  return {
    success: true,
  };
};


