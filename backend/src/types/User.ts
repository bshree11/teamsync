// User types

export interface CreateUserInput{
    email:string;
    password: string;
    name:string;
    role?: 'admin'|'member';
}

export interface UpdateUserInput{
    name?:string;
    avatar?:string;
    role?:'admin'|'member';

}

export interface UserResponse{
    id:string,
    email:string;
    name:string;
    role:string;
    avatar?:string;
    createAt:Date;
}