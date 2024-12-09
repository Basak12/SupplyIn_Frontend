import axios from 'axios';
import API_URL from '../config';
import {Product} from "../model/product";

export const getSuppliersByProduct = async (productId: string) => {
    try {
        const response = await axios.get(`${API_URL}/suppliers/product`, {
            params: { productId }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching suppliers:', error);
        throw error;
    }
};

