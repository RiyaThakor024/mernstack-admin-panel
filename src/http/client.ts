import axios from "axios";
import { useAuthStore } from "../../store";

const DEFAULT_BACKEND = "http://localhost:3000";

export const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_API_URL ?? DEFAULT_BACKEND,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    }
});

// Attach the access token to every request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
   config.headers.set("Authorization",`Bearer ${token}`);
    }
    
    return config;
});


// log resolved baseURL for debugging in browser console
try {
    console.info('API baseURL:', api.defaults.baseURL);
} catch (e) {
    console.error('Error logging API baseURL:', e);
}
 
const refreshToken = async ()=>{
    await axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/auth/refresh`,
        {},
        {
        withCredentials:true,
    });
};


api.interceptors.response.use((response) => response,async (error) =>{
    const originalRequest = error.config;


    if(error.response.status === 401 && !originalRequest._isRetry){
        try {
             originalRequest._isRetry = true;
            const headers = {...originalRequest.header}
            await refreshToken()
            return api.request({...originalRequest,headers})
        } catch(err){
            console.error("TOken refresh errors",err);
            useAuthStore.getState().logout();
            return Promise.reject(err);
            
        }
            
    }
})