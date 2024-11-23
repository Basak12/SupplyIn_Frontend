import axios from 'axios';
import  API_URL  from '../config';
export const getProducts = async () => {
    try {
        const response = await axios.get(`${API_URL}/product`);
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};
