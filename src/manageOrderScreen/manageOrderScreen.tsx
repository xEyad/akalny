import UserOrderTable from "./userOrderTable";
import { FunctionComponent, useState, useReducer, useEffect } from "react";
import { Col, Container, Row, Form, Table, Button } from "react-bootstrap";
import AppState from "mocks/appState";
import { useNavigate, useParams } from "react-router-dom";
import { Order } from "models/order";
import { useDocument } from "react-firebase-hooks/firestore";
import {
  doc,
  DocumentData,
  DocumentSnapshot,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { FirebaseConverters } from "models/firebaseConverters";
import Shop from "models/shop";
const lodash = require("lodash");

interface ManageOrderScreenProps {}

const ManageOrderScreen: FunctionComponent<ManageOrderScreenProps> = () => {
  //hooks
  const classNames = require("classnames");
  const { id } = useParams();
  const navigate = useNavigate();
  let [order, setOrder] = useState<Order>({} as any);

  const [orderSnapshot, loading, orderError] = useDocument(
    doc(AppState.fireStore, "orders", `${id}`),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  useEffect(() => {
    if (orderSnapshot)
      FirebaseConverters.orderConverter
        .fromFirestore(orderSnapshot)
        .then((order) => setOrder(order));
  }, [orderSnapshot]);

  useEffect(() => {
    console.log(order);
  }, [order]);

  async function onSubmitRequest(newRequest) 
  {
    const orderRef = doc(AppState.fireStore, "orders", `${id}`);
    const newOrder = lodash.cloneDeep(order);
    newOrder.requests = newRequest;
    newOrder.shop = doc(AppState.fireStore, "shops", order.shop.id);
    await setDoc(orderRef, newOrder);
    navigate(`/viewOrder/${id}`);
  }

  function getActiveUserRequests() {
    return order.requests.filter((r) => r.user.id == AppState.activeUser?.id);
  }

  function body() {
    if (order.owner && order.shop.id && !loading)
      return (
        <UserOrderTable
          onSubmitRequest={onSubmitRequest}
          requests={getActiveUserRequests()}
          shopId={order.shop.id as string}
        ></UserOrderTable>
      );
    else return <>loading..</>;
  }
  
  return (
    <>
      <div id="page">
        <Container>
          <Row >
            <Col className="mt-4">{body()}</Col>
          </Row>
        </Container>
      </div>
    </>
  );
 
};

export default ManageOrderScreen;
