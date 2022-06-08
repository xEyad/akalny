import { Order } from "models/order";
import { FunctionComponent } from "react";
import { OrderRequest } from "models/orderRequest";
import { Col, Container, Row,Form, Table, Button } from "react-bootstrap";

interface OrderItemsCollectiveTableProps {
    order:Order,
    filterByUserId?:string|"All"
    
}
 
const OrderItemsCollectiveTable: FunctionComponent<OrderItemsCollectiveTableProps> = (props) => {
    
    function groupedItems() : Array<{name:string,qty:number}>
    {
        const itemsMap:Map<string,{name:string,qty:number}> = new Map();
        const reqs = filterRequestsByUsers();
        for (const req of reqs) {
            const key = `${req.item.name} ${req.item.price}`;
            const item = itemsMap[key];
            if(item)
                itemsMap[key] = {name:req.item.name,qty:item.qty+=req.quantity};
            else
                itemsMap[key] = {name:req.item.name,qty:req.quantity};
        }
        let arr: Array<{name:string,qty:number}> = [];        
        for (const [key, value] of Object.entries(itemsMap)) {
            arr.push(value)
          }
        arr.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
        return arr;
    }
    
    function filterRequestsByUsers() :  OrderRequest[]
    {
        if(!props.filterByUserId || props.filterByUserId=='All')
            return props.order.requests;
        else
            return props.order.requests.filter((req)=>req.user.id == props.filterByUserId)
    }
    
    function itemsTable()
    {
        if(props.order.requests?.length ==0)
            return (<h3 className="text-center">No orders yet</h3>)

        const itemsRows = groupedItems().map(
            (item,index) =>    
            <tr key={index+1}>
                <td>{index+1}</td>
                <td>{item.name}</td>
                <td>{item.qty}</td>               
            </tr> 
            );
        return <Table striped bordered hover variant="dark" responsive>
            <thead>
                <tr>
                <th>#</th>
                <th>Item</th>
                <th>Qunatity</th>
                </tr>
            </thead>
            <tbody>
                {itemsRows}
            </tbody>
        </Table>
    }

    return ( <>
        {itemsTable()}
    </> );
}
 
export default OrderItemsCollectiveTable;