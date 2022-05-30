import { Order } from "models/order";
import { FunctionComponent } from "react";

interface PriceSummaryProps {
    order:Order
    
}
 
const PriceSummary: FunctionComponent<PriceSummaryProps> = (props) => {
    function calcSubtotal() 
    {
        const order = props.order;
        if(!order.requests)
            return 0;
        let subtotal = 0;
        for (let i = 0; i < order.requests.length; i++) {
            const request = order.requests[i];
            subtotal+= request.item.price * request.quantity;
        }
        return subtotal;
    }

    function calcVAT() 
    {
        const val = (1/props.order.shop.vatPercentage) * calcSubtotal();
        return val
    }

    function calcTotal() {
        return (calcVAT() + calcSubtotal() + props.order.shop.delivery).toFixed(2);
    }
    //ui
    return ( <>
            {row('Subtotal',`${calcSubtotal()} EGP`)}
            {row('VAT',`${calcVAT().toFixed(2)} EGP` )}
            {row('Delivery',`${props.order.shop.delivery} EGP` )}
            {row('Total',`${calcTotal()} EGP`  )}
    </> );

    function row(label:string,val:string|number) {
        return ( <>
            <div className="d-flex">
                <h6 >{label}:</h6>
                <div className="mx-2"></div>
                <h6>{val}</h6>
            </div>
        </> );
    }
}
 
export default PriceSummary;