import MenuItem from "./menuItem";
import { User } from "./user";

export interface OrderRequest {
    id?:            string;
    item?:       MenuItem;
    qty?:           number;
    date_modified?: string;
    user?:          User;
}