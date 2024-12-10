import axios from 'axios';
import API_URL from '../config';
import { Product } from "../model/product";

export const getSuppliersByProduct = async (productName: string) => {
    try {
        const response = await axios.get(`${API_URL}/products/${encodeURIComponent(productName)}/suppliers`);
        return response.data;
    } catch (error) {
        console.error('Error fetching suppliers:', error);
        throw error;
    }
};
