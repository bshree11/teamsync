/**
 * TASKS API TESTS
 * 
 * What: Tests task endpoints (create, get, update)
 * Why: Tasks are core feature - must work correctly
 * Using: Jest + Supertest
 */

import './setup';
import request from 'supertest';
import express from 'express';
import authRoutes from '../routes/auth';
import taskRoutes from '../routes/tasks';
import teamRoutes from '../routes/teams';
import projectRoutes from '../routes/projects';

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

const testEmail = `tasks-${Date.now()}@test.com`;

let authToken: string;
let teamId: string;
let projectId: string;
let taskId: string;

describe('Tasks API', () => {

  beforeAll(async () => {
    // 1. Register user
    const registerRes = await request(app)
      .post('/api/auth/register')
      .send({
        email: testEmail,
        password: 'password123',
        name: 'Task Tester'
      });
    authToken = registerRes.body.token;

    // 2. Create team
    const teamRes = await request(app)
      .post('/api/teams')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ name: 'Test Team' });
    teamId = teamRes.body.team?.id;

    // 3. Create project
    const projectRes = await request(app)
      .post('/api/projects')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ 
        name: 'Test Project',
        teamId: teamId
      });
    projectId = projectRes.body.project?.id;
  });

  it('should create a task', async () => {
    const response = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        title: 'My Test Task',
        description: 'Testing task creation',
        projectId: projectId,
        priority: 'high'
      });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.task.title).toBe('My Test Task');

    taskId = response.body.task.id;
  });

  it('should get all tasks', async () => {
    const response = await request(app)
      .get('/api/tasks')
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  it('should update task status', async () => {
    const response = await request(app)
      .put(`/api/tasks/${taskId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        status: 'in-progress'
      });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

});