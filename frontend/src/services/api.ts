/* API SERVICE

What: Configure Axios for all API calls
Why: 
 - Set base URL once 
 - Auto-add auth token to every request
 - Handle errors in one place
*/

import axios from 'axios';

//Backend URL - where our Express server runs
const API_URL = 'http://localhost:5000/api';

//Create axios instance with base settings
const api = axios.create({
    baseURL: API_URL,
    headers:{
        'Content-Type': 'application/json',
    },

});

// REQUEST INTERCEPTOR - runs before every api call - it auto-adds tokens so we don't need to write it everytime

api.interceptors.request.use(
    (config) =>{
        //get token from localstorage
        const token = localStorage.getItem('token');
    
    //if token exists, add to header
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
   return config;
 } ,
 (error)=>{
    return Promise.reject(error);
 }
);

//RESPONSE INTERCEPTOR - 
//What: Runs AFTER every API Response
//Why: Handle common errors (like 401 unauthorized)

api.interceptors.response.use(
    (response) =>{
        //successful response - just return it
        return response;
    },
    (error)=>{
        //If 401 (unauthorized) - token expired.invalid
        if(error.response?.status === 401){
            //clear token and redirect to login
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);
export default api;




