import { FunctionComponent, useState, useReducer, useEffect } from "react";
import { Col, Container, Row, Form, Table, Button } from "react-bootstrap";
import { useDocument } from "react-firebase-hooks/firestore";
import {
  doc,
  DocumentData,
  DocumentSnapshot,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { FirebaseConverters } from "models/firebaseConverters";

interface OrdersScreenProps {
    
}
 
const OrdersScreen: FunctionComponent<OrdersScreenProps> = () => {
    return ( <>
    <div id="page">
        <Container>
          <Row >
            <Col className="mt-4">{
                
            }</Col>
          </Row>
        </Container>
      </div>
    </> );
    
}
 
export default OrdersScreen;