//TASK SERVICE - handles task operations

import Task from '../models/Task';
import Project from '../models/Project';

interface CreateTaskInput {
  title: string;
  description?: string;
  projectId: string;
  assignedTo?: string;
  priority?: 'low' | 'medium' | 'high';
  dueDate?: Date;
}

interface UpdateTaskInput {
  title?: string;
  description?: string;
  status?: 'todo' | 'in-progress' | 'done';
  priority?: 'low' | 'medium' | 'high';
  assignedTo?: string;
  dueDate?: Date;
}

interface TaskFilters {
  projectId?: string;
  status?: string;
  priority?: string;
  assignedTo?: string;
}

interface ServiceResult {
  success: boolean;
  task?: any;
  tasks?: any[];
  error?: string;
}


//CREATE TASK
export const createTask = async (
  userId: string,
  input: CreateTaskInput
): Promise<ServiceResult> => {
  const { title, description, projectId, assignedTo, priority, dueDate } = input;

  // Check if project exists
  const project = await Project.findById(projectId);

  if (!project) {
    return {
      success: false,
      error: 'Project not found',
    };
  }

  // Check if user is a member of the project
  const isMember = project.members.some(
    (member) => member.toString() === userId
  );

  if (!isMember) {
    return {
      success: false,
      error: 'You are not a member of this project',
    };
  }

  // Create task
  // Build task data - only include fields that have values
const taskData: any = {
  title,
  description: description || '',
  project: projectId,
  createdBy: userId,
  priority: priority || 'medium',
};

// Only add optional fields if they exist
if (assignedTo) taskData.assignedTo = assignedTo;
if (dueDate) taskData.dueDate = dueDate;

const task = await Task.create(taskData);
  const populatedTask = await Task.findById(task._id)
    .populate('createdBy', 'name email avatar')
    .populate('assignedTo', 'name email avatar')
    .populate('project', 'name');

  return {
    success: true,
    task: {
      id: populatedTask!._id,
      title: populatedTask!.title,
      description: populatedTask!.description,
      status: populatedTask!.status,
      priority: populatedTask!.priority,
      project: populatedTask!.project,
      assignedTo: populatedTask!.assignedTo,
      createdBy: populatedTask!.createdBy,
      dueDate: populatedTask!.dueDate,
      createdAt: populatedTask!.createdAt,
    },
  };
};

//GET TASKS - with filters
export const getTasks =async(
    userId: string,
    filters: TaskFilters
): Promise<ServiceResult> =>{
    //build query
    const query: any ={};
    if(filters.projectId){
        query.project = filters.projectId;
    }
    if(filters.status){
        query.staus = filters.status;
    }
    if(filters.priority){
        query.priority = filters.priority;
    }
    if (filters.assignedTo) {
    query.assignedTo = filters.assignedTo;
  }

  // If no projectId filter, get tasks from user's projects
  if (!filters.projectId) {
    const userProjects = await Project.find({ members: userId });
    const projectIds = userProjects.map((p) => p._id);
    query.project = { $in: projectIds };
  }

  const tasks = await Task.find(query)
    .populate('createdBy', 'name email avatar')
    .populate('assignedTo', 'name email avatar')
    .populate('project', 'name')
    .sort({ createdAt: -1 });

  return {
    success: true,
    tasks: tasks.map((task) => ({
      id: task._id,
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      project: task.project,
      assignedTo: task.assignedTo,
      createdBy: task.createdBy,
      dueDate: task.dueDate,
      createdAt: task.createdAt,
    })),
  };
};

//GET ONE TASK
export const getTaskById = async(
    taskId: string,
    userId: string
): Promise<ServiceResult> =>{
    const task = await Task.findById(taskId)
    .populate('createdBy', 'name email avatar')
        .populate('assignedTo', 'name email avatar')
    .populate('project', 'name');

  if (!task) {
    return {
      success: false,
      error: 'Task not found',
    };
  }

  // Check if user has access to this task's project
  const project = await Project.findById(task.project);

  if (!project) {
    return {
      success: false,
      error: 'Project not found',
    };
  }

  const isMember = project.members.some(
    (member) => member.toString() === userId
  );

  if (!isMember) {
    return {
      success: false,
      error: 'You do not have access to this task',
    };
  }

  return {
    success: true,
    task: {
      id: task._id,
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      project: task.project,
      assignedTo: task.assignedTo,
      createdBy: task.createdBy,
      dueDate: task.dueDate,
      createdAt: task.createdAt,
    },
  };
};

//UPDATE TASK
export const updateTask = async (
  taskId: string,
  userId: string,
  input: UpdateTaskInput
): Promise<ServiceResult> => {
  const task = await Task.findById(taskId);

  if (!task) {
    return {
      success: false,
      error: 'Task not found',
    };
  }

  // Check if user has access
  const project = await Project.findById(task.project);

  if (!project) {
    return {
      success: false,
      error: 'Project not found',
    };
  }

  const isMember = project.members.some(
    (member) => member.toString() === userId
  );

  if (!isMember) {
    return {
      success: false,
      error: 'You do not have access to this task',
    };
  }

  // Update fields
  if (input.title) task.title = input.title;
  if (input.description !== undefined) task.description = input.description;
  if (input.status) task.status = input.status;
  if (input.priority) task.priority = input.priority;
  if (input.assignedTo !== undefined) task.assignedTo = input.assignedTo as any;
  if (input.dueDate !== undefined) task.dueDate = input.dueDate;

  await task.save();

  const updatedTask = await Task.findById(taskId)
    .populate('createdBy', 'name email avatar')
    .populate('assignedTo', 'name email avatar')
    .populate('project', 'name');

  return {
    success: true,
    task: {
      id: updatedTask!._id,
      title: updatedTask!.title,
      description: updatedTask!.description,
      status: updatedTask!.status,
      priority: updatedTask!.priority,
      project: updatedTask!.project,
      assignedTo: updatedTask!.assignedTo,
      createdBy: updatedTask!.createdBy,
      dueDate: updatedTask!.dueDate,
    },
  };
};

//DELETE TASK

export const deleteTask = async (
  taskId: string,
  userId: string
): Promise<ServiceResult> => {
  const task = await Task.findById(taskId);

  if (!task) {
    return {
      success: false,
      error: 'Task not found',
    };
  }

  // Check if user has access
  const project = await Project.findById(task.project);

  if (!project) {
    return {
      success: false,
      error: 'Project not found',
    };
  }

  const isMember = project.members.some(
    (member) => member.toString() === userId
  );

  if (!isMember) {
    return {
      success: false,
      error: 'You do not have access to this task',
    };
  }

  await Task.findByIdAndDelete(taskId);

  return {
    success: true,
  };
};





