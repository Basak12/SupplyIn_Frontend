import axios from 'axios';
import API_URL from '../config';
    export const postPurchaseResult = async (data: any) => {
        try {
            const response = await axios.post(`${API_URL}/purchases`, data);
            return response.data;
        } catch (error) {
            console.error('Error adding criteria weight:', error);
            throw error;
        }
    };
