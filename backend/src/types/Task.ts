// Task types

export interface CreateTaskInput{
    title:string;
    description?:string;
    status?:'todo'|'in_progress'| 'high';
    priority?: 'low' | 'medium' |'high';
    assignedTo?: string;
    projectId: string;
    dueDate?:Date;
}

export interface UpdateTaskInput{
    title?:string;
    description?: string;
    status?:'todo'|'in-progress'|'high';
    priority?:'low'| 'medium'|'high';
    assignedTo? : string;
    duedate?:Date;
}

export interface TaskFilters{
 status?:'todo'|'in-progess'|'done';
 priority? : 'low'| 'medium'| 'high';
 assignedTo? :string;
 projectId?: string;
}