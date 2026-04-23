/* API SERVICE
What: Configure Axios for all API calls
Why: 
 - Set base URL once 
 - Auto-add auth token to every request
 - Handle errors in one place
*/
import axios from 'axios';

// Backend URL - uses environment variable in production, localhost in development
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance with base settings
const api = axios.create({
    baseURL: API_URL,
    headers:{
        'Content-Type': 'application/json',
    },
});

// REQUEST INTERCEPTOR - runs before every api call
api.interceptors.request.use(
    (config) =>{
        const token = localStorage.getItem('token');
    
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error)=>{
        return Promise.reject(error);
    }
);

// RESPONSE INTERCEPTOR
api.interceptors.response.use(
    (response) =>{
        return response;
    },
    (error)=>{
        if(error.response?.status === 401){
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;