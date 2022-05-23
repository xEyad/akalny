import Shop from "models/shop";
import MenuItem from "models/menuItem";
import { FunctionComponent,useState,useReducer,   } from "react";
import { Col, Container, Row,Form, Table, Button } from "react-bootstrap";
import "./orderDetailsScreen.css";
import AppState from "mocks/appState";
import { useNavigate } from "react-router-dom";
interface OrderDetailsScreenProps {
    
}
 
const OrderDetailsScreen: FunctionComponent<OrderDetailsScreenProps> = () => {
    
   
    
    return ( 
        <div id="page">
            <Container>
            <Row>
                <Col>
                    <h1 className="text-center">Manage your order</h1>
                    <h4 className="text-center">Shop name</h4>
                    <hr />
                </Col>
            </Row>
            <Row>
                <Col>
                </Col>
            </Row>
        </Container>
        </div>
     );
}
 
export default OrderDetailsScreen;