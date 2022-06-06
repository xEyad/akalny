import ConfirmationPopup from "confrimationPopup/confrimationPopup";
import AppState from "mocks/appState";
import { Order } from "models/order";
import { OrderRequest } from "models/orderRequest";
import { FunctionComponent, useRef } from "react";
import { Col, Container, Row,Form, Table, Button } from "react-bootstrap";

interface OrdersTableProps {
    order:Order,
    onDeleteItem:(req:OrderRequest,index:number)=>void,
    onEditItem:(req:OrderRequest,index:number)=>void,
    filterByUserId?:string|"All"
}

///Should be renamed to something like: usersOrderRequestsTable
const OrdersTable: FunctionComponent<OrdersTableProps> = (props) => {
    const modalRef=useRef<ConfirmationPopup>()
    ///based on a condition, show jsxElement or elseJSXelement
    function showIf(condition: boolean, jsxElement, elseJSXelement?) {
        if (condition) return jsxElement;
        else return elseJSXelement ? elseJSXelement : <></>;
    }
    function rowAction(request:OrderRequest,index:number)
    {   
        return (<>
            {showIf(
                request.user?.id == AppState.activeUser?.id && props.order.is_active,
                <Button variant="primary" onClick={()=>{props.onEditItem(request,index)}}>Edit</Button>
                )
            }
            <div className="mx-1"></div>
            {
               showIf(
                AppState.activeUser?.id == props.order?.owner?.id,
                <Button 
                    variant="danger" 
                    onClick={() => {
                        const modalTitle = `Delete: ${request.item.name}x${request.quantity} (${(request.item.price * request.quantity).toFixed(2)} EGP)`;
                        modalRef.current.show(
                        {
                            title:modalTitle,
                            onSubmit:()=>props.onDeleteItem(request, index)
                        });              
                    }
                }>
                    Delete
                </Button>
                )    
            }
        </>)
    }
    
    function filterRequestsByUsers() :  OrderRequest[]
    {
        if(!props.filterByUserId || props.filterByUserId=='All')
            return props.order.requests;
        else
            return props.order.requests.filter((req)=>req.user.id == props.filterByUserId)
    }

    function ordersTable()
    {
        if(props.order.requests?.length ==0)
            return (<h3 className="text-center">No orders yet</h3>)

        const shopRows = filterRequestsByUsers().map(
            (request,index) =>    
            <tr key={index+1}>
                <td>{index+1}</td>
                <td>{request.user?.name}</td>
                <td>{request.item?.name}</td>
                <td>{request.quantity}</td>
                <td>{request.item?.price} EGP</td>
                <td>{(new Date(request.date_modified as number)).toLocaleString()}</td>
                <td >
                    <div className="d-flex justify-content-center">
                        {rowAction(request,index)}
                    </div>
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
        <ConfirmationPopup ref={modalRef} />
    </> );
}
 
export default OrdersTable;