// axiosConfig.js
import { useAuth } from "src/context/AuthContext";
import { axiosInstance } from "./sevices/axioxInstance";

axiosInstance.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
        
        config.headers.Authorization = `Bearer ${accessToken}`;
    }else{
        console.log("Access token is missing");
        // console.log(useAuthStore.getState()?.user);
    }
    return config;
});

//Add a response interceptor
axiosInstance.interceptors.response.use(
    response => response, // This will pass through the response
    error => {
        // Handle errors here
        if (!error.response) {
            // Network error or no response received
            window.location = '/network-error'; // se kom kriju hala 
        } else {
            if(error.response.status === 404){
                window.location = '/notFound';
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
