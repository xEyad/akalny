import { orderBy } from "firebase/firestore";
import { Order } from "models/order";
import { FunctionComponent } from "react";
const lodash = require('lodash');

interface PriceSummaryProps {
    order:Order
    filterByUserId?:string|"All"
    
}
 
const PriceSummary: FunctionComponent<PriceSummaryProps> = (props) => {
    const order = getOrder();
    const isFiltered = props.filterByUserId && props.filterByUserId!="All";
    
    function getDelivery() : number
    {
        if(isFiltered)
        {
            const users = Array.from(new Set(props.order.requests.map((req)=>(req.user))));
            return order.shop.delivery / users.length;
        }
        else 
            return order.shop.delivery;
    }

    function getOrder() : Order
    {
        if(!props.filterByUserId || props.filterByUserId=="All")
            return props.order;
        else
        {
            const newReqs = props.order.requests.filter((req)=>req.user.id == props.filterByUserId)
            const order = lodash.cloneDeep(props.order);
            order.requests = newReqs;
            return order;
        }
    }

    function calcSubtotal() 
    {
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
        const val = (1/order.shop.vatPercentage) * calcSubtotal();
        return val
    }

    function calcTotal() {
        return (calcVAT() + calcSubtotal() + getDelivery()).toFixed(2);
    }
    //ui
    return ( <>
            {row('Subtotal',`${calcSubtotal().toFixed(2)} EGP`)}
            {row('VAT',`${calcVAT().toFixed(2)} EGP` )}
            {row('Delivery',`${getDelivery().toFixed(2)} EGP` )}
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