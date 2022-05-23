import MenuItem from "./menuItem";

interface Shop
{
    id?:string;
    name?:string;
    delivery?:number;
    vatPercentage?:number;
    menu?:Array<MenuItem>;
}
export default Shop