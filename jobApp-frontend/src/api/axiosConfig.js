// axiosConfig.js
import { axiosInstance } from "./sevices/axioxInstance";

axiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

let isRefreshing = false;
let subscribers = [];

function onAccessTokenFetched(access_token) {
  subscribers.forEach((callback) => callback(access_token));
  subscribers = [];
}

function addSubscriber(callback) {
  subscribers.push(callback);
}

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const {
      config,
      response: { status },
    } = error;
    const originalRequest = config;

    if (originalRequest.url.includes("/refresh")) {
      return Promise.reject(error);
    }

    if (status === 401) {
      if (!isRefreshing) {
        isRefreshing = true;

        axiosInstance
          .post("/Authentication/refresh", {})
          .then((response) => {
            if (response.data) {
              localStorage.setItem("accessToken", response.data);
              axiosInstance.defaults.headers.common["Authorization"] =
                "Bearer " + response.data;
              onAccessTokenFetched(response.data);
            }
            isRefreshing = false;
          })
          .catch((refreshError) => {
            console.error("Refresh login error:", refreshError);
            redirectToLogin();
            isRefreshing = false;
          });
      }
      if (originalRequest.method === "get") {
        return new Promise((resolve) => {
          addSubscriber((access_token) => {
            originalRequest.headers["Authorization"] = "Bearer " + access_token;
            resolve(axiosInstance(originalRequest));
          });
        });
      } else {
        // Ensure other methods are also queued and retried after token refresh
        return new Promise((resolve, reject) => {
          addSubscriber((access_token) => {
            originalRequest.headers["Authorization"] = "Bearer " + access_token;
            axiosInstance(originalRequest).then(resolve).catch(reject);
          });
        });
      }
    }

    if (status === 403) {
      console.error(
        "Access denied. You do not have permission to perform this action."
      );
      redirectToAccessDenied();
    }

    return Promise.reject(error);
  }
);

//Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => response, // This will pass through the response
  (error) => {
    // Handle errors here
    if (!error.response) {
      // Network error or no response received
      window.location = "/network-error"; // se kom kriju hala
    } else {
      if (error.response.status === 404) {
        window.location = "/notFound";
      }
    }
    return Promise.reject(error);
  }
);

function redirectToLogin() {
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    window.location.href = '/login';
}

function redirectToAccessDenied(){
    window.location.href = '/unauthorized';   
}
