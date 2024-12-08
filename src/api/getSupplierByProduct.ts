import axios from 'axios';
import API_URL from '../config';

export const getSuppliersByProduct = async (product: any) => {
    try {
        const response = await axios.get(`${API_URL}/suppliers`, {
            params: { productId: product.productId }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching suppliers:', error);
        throw error;
    }
};
