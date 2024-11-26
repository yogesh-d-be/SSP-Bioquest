
// // TODO:well worked function but hard to understand
// import axios from 'axios';

// const apiInstance = axios.create({
//     baseURL: 'http://localhost:3030', // Adjust based on your backend URL
//     withCredentials: true, // To send cookies with requests
// });

// // Flag to avoid multiple token refresh requests
// let isRefreshing = false;
// let failedQueue = [];

// const processQueue = (error, token = null) => {
//     failedQueue.forEach((prom) => {
//         if (error) {
//             prom.reject(error);
//         } else {
//             prom.resolve(token);
//         }
//     });
//     failedQueue = [];
// };

// // Request Interceptor
// apiInstance.interceptors.request.use(
//     (config) => {
//         const authToken = localStorage.getItem('bioquest'); // Get accessToken from localStorage
//         if (authToken) {
//             config.headers.Authorization = `Bearer ${authToken}`;
//         }
//         return config;
//     },
//     (error) => Promise.reject(error)
// );

// // Response Interceptor
// apiInstance.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     async (error) => {
//         const originalRequest = error.config;

//         if (
//             error.response?.status === 401 &&
//             !originalRequest._retry &&
//             error.response.data.message === 'Token expired'
//         ) {
//             if (!isRefreshing) {
//                 isRefreshing = true;
//                 try {
//                     console.log("refresh")
//                     const { data } = await axios.post(
//                         'http://localhost:3030/admin/refreshaccesstoken',
//                         {},
//                         { withCredentials: true }
//                     );
//                     const newAccessToken = data.data.accessToken;
//                     localStorage.setItem('bioquest', newAccessToken);
//                     processQueue(null, newAccessToken);
//                     isRefreshing = false;
//                 } catch (refreshError) {
//                     processQueue(refreshError, null);
//                     isRefreshing = false;
//                     return Promise.reject(refreshError);
//                 }
//             }

//             return new Promise((resolve, reject) => {
//                 failedQueue.push({
//                     resolve: (token) => {
//                         originalRequest.headers.Authorization = `Bearer ${token}`;
//                         resolve(axios(originalRequest));
//                     },
//                     reject: (err) => reject(err),
//                 });
//             });
//         }

//         return Promise.reject(error);
//     }
// );

// export default apiInstance;

import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import store from '../redux/store';
import { setTokens, clearTokens } from '../redux/authSlice';


// Create Axios instance
const apiInstance = axios.create({
  baseURL: 'http://localhost:3030', // Backend URL
  withCredentials: true, // To send cookies with requests
});

// Request Interceptor
apiInstance.interceptors.request.use(
  (config) => {
   
    const {auth} = store.getState();
    const authToken = auth.accessToken; 

    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor for Refresh Token Logic
const refreshAuthLogic = async (failedRequest) => {

  try {

    const {auth} = store.getState();

    const response = await axios.post(
     'http://localhost:3030/admin/refreshaccesstoken',
      {},
      { withCredentials: true }
    );
    const { accessToken } = response.data.data;
   store.dispatch(setTokens({accessToken, refreshToken: auth.refreshToken}))

    failedRequest.response.config.headers.Authorization = `Bearer ${accessToken}`;
    return Promise.resolve();
  } catch (error) {
    console.error('Token refresh failed:', error.message);
    store.dispatch(clearTokens());
    return Promise.reject(error);
  }
};

createAuthRefreshInterceptor(apiInstance, refreshAuthLogic);

// Export the configured Axios instance
export default apiInstance;
