import { Order } from "models/order";
import { FunctionComponent } from "react";
import OrdersTable from "./ordersTable";

interface SummaryViewProps {
    order:Order
}
 
const SummaryView: FunctionComponent<SummaryViewProps> = (props) => {
    return ( 
    <>
    
    <OrdersTable order={props.order}></OrdersTable>
    </> 
    );
}
 
export default SummaryView;