import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CreateProjectModal from '../components/features/CreateProjectModal';

/**
 * TEST 1: CreateProjectModal renders correctly
 */
describe('CreateProjectModal', () => {
  it('shows form with title and inputs', () => {
    render(
      <CreateProjectModal
        onClose={() => {}}
        onCreated={() => {}}
      />
    );

    expect(screen.getByText('Create New Project')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter project name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter project description')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Create Project')).toBeInTheDocument();
  });
});

/**
 * TEST 2: Project Service functions exist
 */
describe('Project Service', () => {
  it('exports all required functions', async () => {
    const projectService = await import('../services/projectService');

    expect(projectService.getProjects).toBeDefined();
    expect(projectService.getProject).toBeDefined();
    expect(projectService.createProject).toBeDefined();
    expect(projectService.updateProject).toBeDefined();
    expect(projectService.deleteProject).toBeDefined();
  });
});