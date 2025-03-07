import {Purchase} from "./purchase";
import {CriteriaWeight} from "./criteriaWeight";

export interface Supplier {
    id: string;
    name: string;
    contactInfo: string;
    purchases: Purchase[];
}