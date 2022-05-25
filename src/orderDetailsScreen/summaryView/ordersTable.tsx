import AppState from "mocks/appState";
import { Order } from "models/order";
import { OrderRequest } from "models/orderRequest";
import { FunctionComponent } from "react";
import { Col, Container, Row,Form, Table, Button } from "react-bootstrap";

interface OrdersTableProps {
    order:Order
    
}
 
const OrdersTable: FunctionComponent<OrdersTableProps> = (props) => {

    function rowAction(request:OrderRequest)
    {
        if(request.user?.id == AppState.activeUser?.id || AppState.activeUser?.id == props.order?.owner?.id)
        {
            return (<>
                <Button variant="primary" onClick={()=>{}}>Edit</Button>
                <div className="mx-1"></div>
                <Button variant="danger" onClick={()=>{}}>Delete</Button>
            </>)
        }
        else
            return (<>-</>)
    }

    function ordersTable()
    {
        if(props.order.requests?.length ==0)
            return (<h3 className="text-center">No orders yet</h3>)

        const shopRows = props.order.requests?.map(
            (request,index) =>    
            <tr key={index+1}>
                <td>{index+1}</td>
                <td>{request.user?.name}</td>
                <td>{request.item?.name}</td>
                <td>{request.quantity}</td>
                <td>{request.item?.price}</td>
                <td>{(new Date(request.date_modified as number)).toUTCString()}</td>
                <td className="d-flex justify-content-center">
                {rowAction(request)}
                </td>
            </tr> 
            );
        return <Table striped bordered hover variant="dark" responsive>
            <thead>
                <tr>
                <th>#</th>
                <th>User</th>
                <th>Item</th>
                <th>Qunatity</th>
                <th>Unit price</th>
                <th>Date</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {shopRows}
            </tbody>
        </Table>
    }

    return ( <>
        {ordersTable()}
    </> );
}
 
export default OrdersTable;