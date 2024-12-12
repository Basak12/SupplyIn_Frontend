import {Product} from "./product";
import {Supplier} from "./supplier";
import {User} from "./user";

export interface Purchase {
    id: string;
    purchaseDate: Date;
    supplierScore: number;
    userId: string;
    product: Product;
    supplier: Supplier;
    user: User;
}


