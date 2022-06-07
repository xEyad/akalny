import MenuItem from "./menuItem";

interface Shop
{
    id?:string;
    name:string;
    delivery:number;
    vatPercentage:number;
    menu:Array<MenuItem>;
    menu_link?:string;
}
export default Shop