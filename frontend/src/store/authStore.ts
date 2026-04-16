/* AUTH STORE
What: Stores user authentication data
Why: Any component can check login status, get user info

ZUSTAND - simple state management

Data stored:
 - user: Current logged in user (or null)
 - token: JWT token (or null)
 - isAuthenticated: true/false

 Actions :
  - setUser - save user after login
  - logout - clear everything
  */

  import { create } from 'zustand';
  import type { User } from '../types'


  //Define what out store contains
  interface AuthState{
    //data
    user: User|null;
    token: string|null;
    isAuthenticated:boolean;

    //actions 
    setUser: (user: User, token:string) => void;
    logout:() => void;
  }

  //Create Store..

  export const useAuthStore = create<AuthState>((set) =>({
    //initial state - check localstorage for existing token
     user: null,
     token: localStorage.getItem('token'),
     isAuthenticated: !!localStorage.getItem('token'),


     //Set User - after login / register
     setUser:(user: User, token:string)=>{
        //save token to localstorage (persists after page refresh)
        localStorage.setItem('token',token);
        
        //update store state
        set({
            user: user,
            token: token,
            isAuthenticated:true,
        });
     },


     //LOGOUT - called when user clicks logout- clears everything

     logout:()=>{
        //remove token from localStorage
        localStorage.removeItem('token');

        //clear store state
        set({
            user: null,
            token: null,
            isAuthenticated:false,
        });
     },
  }));

