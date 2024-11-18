import axios from 'axios';
import  API_URL  from '../config';
export const getPurchases = async () => {
    try {
        const response = await axios.get(`${API_URL}/purchases`);
        return response.data;
    } catch (error) {
        console.error('Error fetching purchases:', error);
        throw error;
    }
};
