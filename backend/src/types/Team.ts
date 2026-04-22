// Team types 

import e from "express";

export interface CreateTeamInput{
    name:string;
    description?: string;
}

export interface AddMemberInput{
    userId: string;
    role?: 'admin'|'member';
}

export interface TeamResponse{
    id:string,
    name:string,
    description?:string;
    owner: string;
    memberCount:number;
    createdAt:Date;
}

