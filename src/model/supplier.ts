import {Purchase} from "./purchase";
import {CriteriaWeight} from "./criteriaWeight";
import {SupplierProduct} from "./supplierProduct";

export interface Supplier {
    id: string;
    name: string;
    contactInfo: string;
    purchases: Purchase[];
    supplierProduct: SupplierProduct[];
}