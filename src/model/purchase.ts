import {Product} from "./product";
import {Supplier} from "./supplier";
import {User} from "./user";

export interface Purchase {
    id: string;
    purchaseDate: Date;
    userId: string;
    product: Product;
    supplier: Supplier;
    user: User;
}


