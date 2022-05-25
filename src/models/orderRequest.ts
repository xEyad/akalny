import MenuItem from "./menuItem";
import { User } from "./user";

export interface OrderRequest {
    id?:            string;
    item:       MenuItem;
    quantity:           number;
    date_modified: number;
    user:          User;
}