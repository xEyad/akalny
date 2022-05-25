
import { FunctionComponent,useState,useReducer, useEffect,   } from "react";
import { Col, Container, Row,Form, Table, Button } from "react-bootstrap";
import "./orderDetailsScreen.css";
import AppState from "mocks/appState";
import { useNavigate, useParams } from "react-router-dom";
import { Order } from "models/order";
import SummaryView from "./summaryView/summaryView";
import { useDocument } from "react-firebase-hooks/firestore";
import { doc, DocumentData, DocumentSnapshot, getDoc } from "firebase/firestore";
import { FirebaseConverters } from "models/firebaseConverters";


interface OrderDetailsScreenProps {
}
 
const OrderDetailsScreen: FunctionComponent<OrderDetailsScreenProps> = () => {
    //hooks
    const classNames = require('classnames');
    const {id} = useParams();
    let [order, setOrder] = useState<Order>({} as any);

    const [orderSnapshot, loading, error] = useDocument(
        doc(AppState.fireStore, 'orders',`${id}`),
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        }
    );

   useEffect(() => {
       if(orderSnapshot)
        FirebaseConverters.orderConverter.fromFirestore(orderSnapshot).then((order)=> setOrder(order));   
    
   }, [orderSnapshot])
   
   //methods
   
   //UI
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
                {body()}
                </Col>
            </Row>
        </Container>
        </div>
    );
    
    function body()
    {
        if(loading || !(order.shop))
            return (<h3 className="center w-100">Loading..</h3>);
        return <SummaryView order={order}></SummaryView>
    }

   function statusStyle() : string
   {
        return classNames(
            {'order-active':order?.is_active},
            {'order-dead':!order?.is_active},
        );
   } 
   
}
 
export default OrderDetailsScreen;