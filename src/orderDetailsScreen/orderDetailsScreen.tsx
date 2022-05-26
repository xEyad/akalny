
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
import ManageOrderView from "./userOrderView/manageOrderView";


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
   
   const [viewMode, setViewMode] = useState<"summary"|"creation">("summary")
   //methods
   
   //UI
   return ( 
        <div id="page">
            <Container>
            <Row>
                <Col>
                    <h1 className="text-center">Manage your order</h1>
                    <div className="d-flex justify-content-center">
                        <h4 className={"text-center me-2 " + statusStyle()} >{order?.shop?.name || "Loading..."}</h4>
                        <>{toggleViewModeBtn()}</>
                    </div>
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
    
    function toggleViewModeBtn()
    {
        if(viewMode=="creation")
            return <Button onClick={()=>setViewMode("summary")}>View order summary</Button>
        else if(viewMode=="summary")
           return <Button onClick={()=>setViewMode("creation")}>Change your request</Button>
    }

    function body()
    {
        if(loading || !(order.shop))
            return (<h3 className="center w-100">Loading..</h3>);

        if(viewMode=="summary")
            return (<SummaryView order={order}></SummaryView>)
        else if(viewMode=="creation")
            return (<ManageOrderView></ManageOrderView>)
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