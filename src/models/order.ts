import { OrderRequest } from "./orderRequest";
import Shop from "./shop";
import { User } from "./user";

export interface Order {
    id?:       string;
    owner:    User;
    shop:     Shop;
    is_active: boolean;
    requests: OrderRequest[];
    creation_date:number;
}



