/* Auth Service - functions for authentication API calls 

Functions : 
   - login (email, password)
   - register(name, email, password)
   - getMe() - get current user

  */
 
import api from './api'; 
import type { AuthResponse, User } from '../types';

// Login  - send email + password to backend

export const login = async(
    email: string,
    password: string
): Promise<AuthResponse> =>{
    const response = await api.post('/auth/login', {
        email,
        password,
    });
    return response.data;
};

// Register - creates new user account 

export const register = async(
    name: string,
    email: string,
    password: string
): Promise<AuthResponse> =>{
    const response = await api.post('/auth/register', {
        name,
        email,
        password,
    });
    return response.data;
};

//Get me - gets current logged in user using token - token is autoadded by interceptor

export const getMe = async(): Promise<User> =>{
    const response = await api.get('/auth/me');
    return response.data.user;
};
 
