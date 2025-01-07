import axios from 'axios';
import API_URL from '../config';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Eğer çerez gerekiyorsa
});

export default api;
