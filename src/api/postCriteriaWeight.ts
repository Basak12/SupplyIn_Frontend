import axios from 'axios';
import API_URL from '../config';

    export const postCriteriaWeight = async (data: any) => {
        try {
            const response = await axios.post(`${API_URL}/criteriaWeight`, data);
            return response.data;
        } catch (error) {
            console.error('Error adding criteria weight:', error);
            throw error;
        }
    };
