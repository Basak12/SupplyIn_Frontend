import {Purchase} from "./purchase";

export interface User {
    id: string;
    name: string;
    surname: string;
    email: string;
    password: string;
    isActive: boolean;
    purchases: Purchase[];
}
