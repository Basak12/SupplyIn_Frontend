import {Purchase} from "./purchase";
import {Supplier} from "./supplier";

export interface Product {
    id: string;
    name: string;
    description: string;
    productCategory: string;
    supplier: Supplier;
    purchases: Purchase[];
}
