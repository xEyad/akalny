import MenuItem from "./menuItem";

interface Shop
{
    name:string;
    delivery:number;
    vatPercentage:number;
    menu:Array<MenuItem>;
}
export default Shop