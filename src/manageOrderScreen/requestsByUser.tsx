import { Order } from "models/order";
import { OrderRequest } from "models/orderRequest";
import { User } from "models/user";
import Utility from "models/utility";
import { FunctionComponent } from "react";
import { Table } from "react-bootstrap";

interface RequestsByUsersProps {
    order:Order
}
 
const RequestsByUsers: FunctionComponent<RequestsByUsersProps> = (props) => {

    const users = Utility.getUniqueUsers(props.order.requests);
    // {'user','requests[]'}
    const groupedRequests = getGroupedRequests();
    
    function getGroupedRequests()
    {
        let reqs={};
        for (const user of users) {
            reqs[user.id] = [];
        }

        for (const req of props.order.requests) {
            reqs[req.user.id].push(req)
        }
        return reqs;
    }

    function requestCard(requests:OrderRequest[])
    {
        const user = requests[0].user;
        
        const totalItems = requests.map((req)=>req.quantity).reduce((prev,cur)=>prev+cur)
        const subtotal = requests.map((req)=>req.quantity*req.item.price).reduce((prev,cur)=>prev+cur)
        const delivery = props.order.shop.delivery/users.length;
        let vat = 0;
        if(props.order.shop.vatPercentage != 0)
            vat = (props.order.shop.vatPercentage/100)*subtotal;
        const totalPrice = subtotal + delivery + vat;

        const requestsUI = requests.map((req)=><>
            <tr key={req.item.name + `${req.item.price}`}>
                <td>{req.item.name}</td>
                <td>{req.quantity}</td>
            </tr>
        </>)

        return (
            <div  className="mx-4">
                <h1>{user.name}</h1>
                <Table variant="dark" bordered title={`Subtotal: ${subtotal.toFixed(2)} EGP\nDelivery: ${delivery.toFixed(2)} EGP\nVAT: ${vat.toFixed(2)} EGP`}>
                <tbody>
                    {requestsUI}
                    <tr>
                        <td>Total items</td>
                        <td>{totalItems} Item(s)</td>
                    </tr>
                    <tr>
                        <td>Total Price</td>
                        <td>{totalPrice.toFixed(2)} EGP</td>
                    </tr>
                </tbody>
                </Table>
            </div>
            
        )
    }

    function body()
    {
        return (
            <div className="d-flex flex-wrap">
                {users.map((user)=>
                <div key={user.id}>
                    {requestCard(groupedRequests[user.id])}
                </div>
                 )}
        </div>);
    
    }
    return ( body());
}
 
export default RequestsByUsers;