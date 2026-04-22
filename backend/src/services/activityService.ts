//ACTIVITY SERVICE - logs all actions in the system


import Activity from '../models/Activity';
import Project from '../models/Project';

interface CreateActivityInput {
  user: string;
  action: string;
  targetType: 'task' | 'project' | 'team' | 'user';
  targetId: string;
  details?: string;
}

interface ServiceResult {
  success: boolean;
  activity?: any;
  activities?: any[];
  error?: string;
}

/**
 * CREATE ACTIVITY
 */
export const createActivity = async (
  input: CreateActivityInput
): Promise<ServiceResult> => {
  const activity = await Activity.create({
    user: input.user,
    action: input.action,
    targetType: input.targetType,
    targetId: input.targetId,
    details: input.details || '',
  });

  return {
    success: true,
    activity: {
      id: activity._id,
      user: activity.user,
      action: activity.action,
      targetType: activity.targetType,
      targetId: activity.targetId,
      details: activity.details,
      timestamp: activity.timestamp,
    },
  };
};

/**
 * GET ACTIVITY FEED (for user's projects)
 */
export const getActivityFeed = async (
  userId: string
): Promise<ServiceResult> => {
  // Get user's projects
  const userProjects = await Project.find({ members: userId });
  const projectIds = userProjects.map((p) => p._id);

  // Get activities for those projects
  const activities = await Activity.find({
    $or: [
      { targetType: 'project', targetId: { $in: projectIds } },
      { targetType: 'task' },
      { user: userId },
    ],
  })
    .populate('user', 'name email avatar')
    .sort({ timestamp: -1 })
    .limit(50);

  return {
    success: true,
    activities: activities.map((activity) => ({
      id: activity._id,
      user: activity.user,
      action: activity.action,
      targetType: activity.targetType,
      targetId: activity.targetId,
      details: activity.details,
      timestamp: activity.timestamp,
    })),
  };
};

/**
 * GET PROJECT ACTIVITY
 */
export const getProjectActivity = async (
  projectId: string,
  userId: string
): Promise<ServiceResult> => {
  // Check if user has access to project
  const project = await Project.findById(projectId);

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
      error: 'You do not have access to this project',
    };
  }

  const activities = await Activity.find({
    targetType: 'project',
    targetId: projectId,
  })
    .populate('user', 'name email avatar')
    .sort({ timestamp: -1 })
    .limit(50);

  return {
    success: true,
    activities: activities.map((activity) => ({
      id: activity._id,
      user: activity.user,
      action: activity.action,
      targetType: activity.targetType,
      targetId: activity.targetId,
      details: activity.details,
      timestamp: activity.timestamp,
    })),
  };
};