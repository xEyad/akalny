import { OrderRequest } from "./requests";
import Shop from "./shop";
import { User } from "./user";

export interface Order {
    id?:       string;
    owner?:    User;
    shop?:     Shop;
    is_active: boolean;
    requests?: OrderRequest[];
}



