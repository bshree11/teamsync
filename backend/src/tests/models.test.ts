/**
 * MODEL TESTS
 * 
 * What: Tests all database models
 * Using: Jest + Mongoose
 */

import './setup';
import User from '../models/User';
import Team from '../models/Team';
import Project from '../models/Project';
import Task from '../models/Task';
import Activity from '../models/Activity';
import Notification from '../models/Notification';

// Generate unique email each test run
const uniqueId = Date.now();

describe('User Model', () => {
  it('should create a user successfully', async () => {
    const user = await User.create({
      email: `test-${uniqueId}@example.com`,
      password: 'password123',
      name: 'Test User',
    });

    expect(user._id).toBeDefined();
    expect(user.email).toBe(`test-${uniqueId}@example.com`);
    expect(user.name).toBe('Test User');
  });

  it('should hash password before saving', async () => {
    const user = await User.create({
      email: `hash-${uniqueId}@example.com`,
      password: 'plainpassword',
      name: 'Hash Test',
    });

    expect(user.password).not.toBe('plainpassword');
    expect(user.password.length).toBeGreaterThan(20);
  });
});

describe('Team Model', () => {
  it('should create a team successfully', async () => {
    const user = await User.create({
      email: `owner-${uniqueId}@example.com`,
      password: 'password123',
      name: 'Team Owner',
    });

    const team = await Team.create({
      name: 'Test Team',
      description: 'A test team',
      owner: user._id,
      members: [{ user: user._id, role: 'owner', joinedAt: new Date() }],
    });

    expect(team._id).toBeDefined();
    expect(team.name).toBe('Test Team');
  });
});

describe('Project Model', () => {
  it('should create a project successfully', async () => {
    const user = await User.create({
      email: `project-${uniqueId}@example.com`,
      password: 'password123',
      name: 'Project Owner',
    });

    const team = await Team.create({
      name: 'Project Team',
      owner: user._id,
      members: [{ user: user._id, role: 'owner', joinedAt: new Date() }],
    });

    const project = await Project.create({
      name: 'Test Project',
      description: 'A test project',
      team: team._id,
      members: [user._id],
    });

    expect(project._id).toBeDefined();
    expect(project.name).toBe('Test Project');
  });
});

describe('Task Model', () => {
  it('should create a task successfully', async () => {
    const user = await User.create({
      email: `task-${uniqueId}@example.com`,
      password: 'password123',
      name: 'Task Creator',
    });

    const team = await Team.create({
      name: 'Task Team',
      owner: user._id,
      members: [{ user: user._id, role: 'owner', joinedAt: new Date() }],
    });

    const project = await Project.create({
      name: 'Task Project',
      team: team._id,
      members: [user._id],
    });

    const task = await Task.create({
      title: 'Test Task',
      description: 'A test task',
      project: project._id,
      createdBy: user._id,
      priority: 'high',
    });

    expect(task._id).toBeDefined();
    expect(task.title).toBe('Test Task');
    expect(task.status).toBe('todo');
  });
});

describe('Activity Model', () => {
  it('should create an activity successfully', async () => {
    const user = await User.create({
      email: `activity-${uniqueId}@example.com`,
      password: 'password123',
      name: 'Activity User',
    });

    const activity = await Activity.create({
      user: user._id,
      action: 'created_task',      // ← Changed to match enum
      targetType: 'task',
      targetId: user._id,
      details: 'Created a task',
    });

    expect(activity._id).toBeDefined();
    expect(activity.action).toBe('created_task');  // ← Update this too
  });
});


describe('Notification Model', () => {
  it('should create a notification successfully', async () => {
    const user = await User.create({
      email: `notif-${uniqueId}@example.com`,
      password: 'password123',
      name: 'Notification User',
    });

    const notification = await Notification.create({
      user: user._id,
      message: 'Test notification',
      type: 'task_assigned',      // Changed from 'task' to 'task_assigned'
    });

    expect(notification._id).toBeDefined();
    expect(notification.message).toBe('Test notification');
    expect(notification.read).toBe(false);
  });
});