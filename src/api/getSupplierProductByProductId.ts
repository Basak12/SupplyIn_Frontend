import axios from 'axios';
import API_URL from '../config';
import { Product } from "../model/product";

export const getSupplierProductsByProductId = async (productId: string) => {
    try {
        const response = await axios.get(`${API_URL}/supplierProduct/byProduct/${productId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching suppliers:', error);
        throw error;
    }
};
export const getSupplierProductsByProductCategory = async (productCategory: string) => {
    try {
        const response = await axios.get(`${API_URL}/supplierProduct/byProductCategory/${productCategory}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching suppliers:', error);
        throw error;
    }
};
//http://localhost:5050/supplierProduct/byProduct/eaf6661e-497b-40f7-8a84-39e44e16192f