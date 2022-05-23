import { User } from "./user";

export interface OrderRequest {
    id?:            string;
    item_id?:       string;
    price?:         number;
    qty?:           number;
    date_modified?: string;
    user?:          User;
    item_price?:    number;
}