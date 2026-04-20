import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CreateTaskModal from '../components/features/CreateTaskModal';
import TaskCard from '../components/features/TaskCard';

/**
 * TEST 1: CreateTaskModal renders correctly
 */
describe('CreateTaskModal', () => {
  it('shows form with title and inputs', () => {
    render(
      <CreateTaskModal
        onClose={() => {}}
        onCreated={() => {}}
      />
    );

    expect(screen.getByText('Create New Task')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter task title')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter task description')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Create Task')).toBeInTheDocument();
  });
});

/**
 * TEST 2: TaskCard renders correctly
 */
describe('TaskCard', () => {
  it('shows task title and priority', () => {
    const mockTask = {
      id: '1',
      title: 'Test Task',
      description: 'Test description',
      status: 'todo' as const,
      priority: 'high' as const,
      project: 'project1',
      createdBy: { id: '1', name: 'User', email: 'test@test.com', role: 'member' as const },
      createdAt: '2024-01-01'
    };

    render(
      <TaskCard
        task={mockTask}
        onStatusChange={() => {}}
      />
    );

    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByText('🔴 high')).toBeInTheDocument();
  });
});

/**
 * TEST 3: Task Service functions exist
 */
describe('Task Service', () => {
  it('exports all required functions', async () => {
    const taskService = await import('../services/taskService');

    expect(taskService.getTasks).toBeDefined();
    expect(taskService.getTask).toBeDefined();
    expect(taskService.createTask).toBeDefined();
    expect(taskService.updateTask).toBeDefined();
    expect(taskService.deleteTask).toBeDefined();
  });
});