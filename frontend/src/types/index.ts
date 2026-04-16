/* Typescript types

What: Defines what our data looks like
Why : Helps catch errors, better autocomplete

Ex: If user has 'name', Typescript will warn you if you accidentally type 'user.nme'
*/

export interface User{
    id:string;
    email: string;
    name: string;
    avatar?: string;
    role:"member"| 'admin'| 'owner';
}

//Team member - user + their role in team
export interface TeamMember{
    user: User,
    role: 'owner'|'admin'|'member';
    joinedAt: string;
}

//Team - group of people working together
export interface Team{
    id:string;
    name:string;
    description?: string;
    owner: User;
    members: TeamMember[];
    createdAt: string;
}

export interface Project{
    id:string;
    name:string;
    description?: string;
    team: Team;
    members: User[];
    status:'active'|'completed'|'archieved';
    createdAt: string;
}

//Task - belongs to a project
export interface Task{
    id:string;
    title: string;
    description?: string;
    status: 'todo'|'in-progress'|'done';
    priority: 'low'|'medium'|'high';
    project: Project;
    assignedTo?: User;
    createdBy: User;
    dueDate?: string;
    createdAt: string;

}

//API response types - what backend sends back
export interface AuthResponse{
    success: boolean;
    token: string;
    user: User;
}

export interface ApiError{
    success:boolean;
    error: string;
}

