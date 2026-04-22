import { describe, it, expect } from 'vitest';

/**
 * TEST 1: AI Service functions exist
 */
describe('AI Service', () => {
  it('exports generateSummary function', async () => {
    const aiService = await import('../services/aiService');
    expect(aiService.generateSummary).toBeDefined();
  });
});

/**
 * TEST 2: AISummary component exists
 */
describe('AISummary Component', () => {
  it('can be imported', async () => {
    const module = await import('../components/features/AISummary');
    expect(module.default).toBeDefined();
  });
});