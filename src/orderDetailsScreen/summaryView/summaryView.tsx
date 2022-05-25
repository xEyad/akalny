import { Order } from "models/order";
import PriceSummary from "orderDetailsScreen/components/priceSummary";
import { FunctionComponent } from "react";
import OrdersTable from "./ordersTable";

interface SummaryViewProps {
    order:Order
}
 
const SummaryView: FunctionComponent<SummaryViewProps> = (props) => {
    return ( 
    <>    
    <OrdersTable order={props.order}></OrdersTable>
    <PriceSummary order={props.order}></PriceSummary>
    </> 
    );
}
 
export default SummaryView;