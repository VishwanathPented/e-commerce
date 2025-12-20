import axios from 'axios';

// Create Axios instance
const api = axios.create({
    baseURL: 'http://localhost:8080/api', // Spring Boot Backend URL
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to attach JWT token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Add a response interceptor to handle Auth errors globally
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            // Token is invalid or expired
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            // Redirect to login or reload to trigger AuthContext state update
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;
