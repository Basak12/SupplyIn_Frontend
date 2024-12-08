import {Purchase} from "./purchase";
import {Supplier} from "./supplier";

export interface Product {
    id: string;
    name: string;
    description: string;
    productCategory: string;
    price: number;
    warranty: string;
    safetyRegulationsCompliance: string;
    reliability: number;
    deliveryTimeWeeks: number;
    supplier: Supplier;
    purchases: Purchase[];
}
