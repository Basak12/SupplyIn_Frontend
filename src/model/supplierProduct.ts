import {Supplier} from "./supplier";
import {Product} from "./product";

export interface SupplierProduct {
    id: string;
    supplierId: string;
    productId: string;
    supplier: Supplier;
    product: Product;
    price: number;
    warranty: string;
    safetyRegulationsCompliance: string;
    reliability: number;
    deliveryTimeWeeks: number;
    criteriaWeight: {
        price: number;
        deliveryTime: number;
        warranty: number;
        reliability: number;
        safetyRegulationsCompliance: number;
    };
}
