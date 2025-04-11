// axiosConfig.js
import { axiosInstance } from "./sevices/axioxInstance";
import { useAuthStore } from "src/store/authStore"; 

axiosInstance.interceptors.request.use((config) => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
        console.log(useAuthStore.getState()?.user);
        config.headers.Authorization = `Bearer ${token}`;
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
