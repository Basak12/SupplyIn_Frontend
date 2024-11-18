import axios from 'axios';
import  API_URL  from '../config';
export const getSuppliers = async () => {
    try {
        const response = await axios.get(`${API_URL}/suppliers`);
        return response.data;
    } catch (error) {
        console.error('Error fetching suppliers:', error);
        throw error;
    }
};
