
import { FunctionComponent,useState,useReducer, useEffect,   } from "react";
import { Col, Container, Row,Form, Table, Button } from "react-bootstrap";
import "./orderDetailsScreen.css";
import AppState from "mocks/appState";
import { useNavigate, useParams } from "react-router-dom";
import { Order } from "models/order";
import SummaryView from "./summaryView/summaryView";



interface OrderDetailsScreenProps {
}
 
const OrderDetailsScreen: FunctionComponent<OrderDetailsScreenProps> = () => {
    const classNames = require('classnames');
    const {id} = useParams();
    let [order, setOrder] = useState<Order>({} as any);
    
   useEffect(() => {
    setOrder(AppState.orders.find((item)=>item.id==id) as Order);
   
     return () => {
       //close socket
     }
   }, [])
   
   function statusStyle() : string
   {
    return classNames(
        {'order-active':order.is_active},
        {'order-dead':!order.is_active},
    );
   } 
    return ( 
        <div id="page">
            <Container>
            <Row>
                <Col>
                    <h1 className="text-center">Manage your order</h1>
                    <h4 className={"text-center " + statusStyle()} >{order?.shop?.name || "Loading..."}</h4>
                    <hr />
                </Col>
            </Row>
            <Row>
                <Col>
                <SummaryView order={order}></SummaryView>
                </Col>
            </Row>
        </Container>
        </div>
     );
}
 
export default OrderDetailsScreen;