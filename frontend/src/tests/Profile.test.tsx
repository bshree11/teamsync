import { describe, it, expect } from 'vitest';


//Test 1 : AI Service  functions exist

describe('AI Service', ()=>{
    it('exports generateSummary function', async ()=>{
        const aiService = await import ('../services/aiService');
        expect(aiService.generateSummary).toBeDefined();
    });

    it('generates correct summary from tasks', async ()=>{
        const { generateSummary } = await import('../services/aiService');

        const mockTasks =[
            {id: '1', title:'Task 1', status: 'todo', priority: 'high', createdAt: '',createdBy: {id:'1', name:'User', email:'test@test.com', role: 'member' as const} },
                  { id: '2', title: 'Task 2', status: 'done', priority: 'low', createdAt: '', createdBy: { id: '1', name: 'User', email: 'test@test.com', role: 'member' as const } },

        ];

        const summary = generateSummary(mockTasks as any);

        expect(summary.totalTasks).toBe(2);
        expect(summary.todoCount).toBe(1);
        expect(summary.doneCount).toBe(1);
        expect(summary.completionRate).toBe(50);
    });
});

//Test 2 : AISummary component exists

describe('AISummary component', ()=>{
    it('can be imported', async()=>{
        const module = await import('../components/features/AISummary');
        expect(module.default).toBeDefined();
    });
});