import axios from 'axios';
import API_URL from '../config';
import { Product } from "../model/product";

export const getSupplierProductsByProductId = async (productId: string) => {
    try {
        const response = await axios.get(`${API_URL}/supplierProduct/${encodeURIComponent(productId)}/products`);
        return response.data;
    } catch (error) {
        console.error('Error fetching suppliers:', error);
        throw error;
    }
};
