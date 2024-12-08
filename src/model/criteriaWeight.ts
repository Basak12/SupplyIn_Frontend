import {Supplier} from "./supplier";

export interface CriteriaWeight {
    id: string;
    productId: string;
    reliabilityScore: number;
    priceScore: number;
    deliveryTimeScore: number;
    warrantyScore: number;
    complianceScore: number;
    timeStamp: Date;
    supplier: Supplier;
}
