import axios from "axios";

const DEFAULT_BACKEND = 'http://localhost:3000';

export const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_API_URL ?? DEFAULT_BACKEND,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    }
});

// log resolved baseURL for debugging in browser console
try {
    console.info('API baseURL:', api.defaults.baseURL);
} catch (e) {
    console.error('Error logging API baseURL:', e);
}