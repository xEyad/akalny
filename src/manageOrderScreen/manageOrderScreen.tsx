import UserOrderTable from "./userOrderTable";
import { FunctionComponent,useState,useReducer, useEffect,   } from "react";
import { Col, Container, Row,Form, Table, Button } from "react-bootstrap";
import AppState from "mocks/appState";
import { useNavigate, useParams } from "react-router-dom";
import { Order } from "models/order";
import { useDocument } from "react-firebase-hooks/firestore";
import { doc, DocumentData, DocumentSnapshot, getDoc } from "firebase/firestore";
import { FirebaseConverters } from "models/firebaseConverters";
import Shop from "models/shop";

interface ManageOrderScreenProps {
    
}
 
const ManageOrderScreen: FunctionComponent<ManageOrderScreenProps> = () => {

    //hooks
    const classNames = require('classnames');
    const {id} = useParams();
    let [order, setOrder] = useState<Order>({} as any);

    const [orderSnapshot, loading, orderError] = useDocument(
        doc(AppState.fireStore, 'orders',`${id}`),
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        }
    );
    useEffect(() => {
        if(orderSnapshot)
         FirebaseConverters.orderConverter.fromFirestore(orderSnapshot).then((order)=> setOrder(order));     
         
    }, [orderSnapshot])

   useEffect(() => {
    console.log(order);
    
   }, [order])
   
    ///create table
    /*
    get orders
    filter by active user
    enable user to add item from list and quantity
    enable user to edit item price (pahse 2)
    show prices and totals (optional)
    */
    function getActiveUserRequests() 
    {
        return order.requests.filter((r)=>r.user.id == AppState.activeUser?.id)    
    }

    return ( <>
    <div id="page">
    <Container>
        <Row>
            <Col>
            {body()}
            </Col>
        </Row>
    </Container>

    </div>
    </> );
    function body()
    {
        if(order.owner && order.shop.id && !loading)
        return <UserOrderTable requests={getActiveUserRequests()} shopId={order.shop.id as string}></UserOrderTable>
        else
        return <>loading..</>
    }
}
 
export default ManageOrderScreen;