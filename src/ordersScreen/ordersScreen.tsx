import { FunctionComponent, useState, useReducer, useEffect, useRef } from "react";
import { Col, Container, Row, Form, Table, Button } from "react-bootstrap";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  DocumentSnapshot,
  getDoc,
  limit,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { FirebaseConverters } from "models/firebaseConverters";
import AppState from "mocks/appState";
import { Order } from "models/order";
import { useNavigate } from "react-router-dom";
import './ordersScreen.css'
import Utility from "models/utility";
import ConfirmationPopup from "../confrimationPopup/confrimationPopup";
const lodash = require("lodash");
const classNames = require("classnames");

interface OrdersScreenProps {}

const OrdersScreen: FunctionComponent<OrdersScreenProps> = () => {
  //hooks
  const modalRef = useRef<ConfirmationPopup>()
  const navigate = useNavigate();
  let [orders, setOrders] = useState<Order[]>([]);
  const [ordersSnapshot, loading, error] = useCollection(
    query(collection(AppState.fireStore, "orders"),orderBy('creation_date',"desc"),limit(10)),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  
  useEffect(() => {
    if (ordersSnapshot) {
      const ordersPromises: Promise<Order>[] = ordersSnapshot.docs.map(
        (orderDoc) => {
          return FirebaseConverters.orderConverter.fromFirestore(
            orderDoc
          );
        }
      );
      Promise.all(ordersPromises).then((orders) => setOrders(orders));
    }
  }, [ordersSnapshot]);

  
  //methods
  function joinOrder(orderId: string) {
    navigate(`/viewOrder/${orderId}`);
  }

  function createOrder() {
    navigate(`/createOrder`);
  }


  function deleteOrder(orderId:string) {    
    deleteDoc(doc(AppState.fireStore, "orders", orderId));
  }

  function toggleOrderStatus(orderId: string) {
    const orderRef = doc(AppState.fireStore, "orders", orderId);
    const newOrder = lodash.cloneDeep(
      orders.find((order) => order.id == orderId)
    );
    newOrder.is_active = !newOrder.is_active;
    newOrder.shop = doc(AppState.fireStore, "shops", newOrder.shop.id);
    setDoc(orderRef,newOrder)
  }

  function getOrderDate(order: Order): string {
    return new Date(order.creation_date).toLocaleString();
  }

  function statusStyle(order: Order): string {
    return classNames(
      { "order-active": order?.is_active },
      { "order-dead": !order?.is_active }
    );
  }

  //ui

  ///based on a condition, show jsxElement or elseJSXelement
  function showIf(condition: boolean, jsxElement, elseJSXelement?) {
    if (condition) return jsxElement;
    else return elseJSXelement ? elseJSXelement : <></>;
  }

  function ordersTable() {
    const ordersRows = orders.map((item, index) => (
      <tr key={item.id}>
        <td>{index + 1}</td>
        <td>{item.owner.name}</td>
        <td>{item.shop.name}</td>
        <td className={statusStyle(item)}>{item.is_active ? "Active" : "In-active"} </td>
        <td>{Utility.getUniqueUsers(item.requests).length} user(s)</td>
        <td>{getOrderDate(item)} </td>
        <td >
            <div className="d-flex justify-content-center">
            {
               <Button
               variant="success"
               onClick={() => {
               joinOrder(item.id as string);
               }}
                >
                    {item.is_active? 'Join' : "View"}
                </Button>
            }
          
          <div className="mx-1"></div>
          {showIf(
            AppState.activeUser.id == item.owner.id,
            <Button
              variant="danger"
              onClick={async () => {
                const modalTitle = `Delete order by ${item.owner.name} with ${Utility.getUniqueUsers(item.requests).length} contributors`;
                modalRef.current.show(
                  {
                    title:modalTitle,
                    onSubmit:()=>deleteOrder(item.id as string)
                  });                
              }}
            >
              Delete
            </Button>
          )}

          <div className="mx-1"></div>
          
          {showIf(
            AppState.activeUser.id == item.owner.id,
            <Button
              variant="primary"
              onClick={() => {
                toggleOrderStatus(item.id as string);
              }}
            >
              Toggle status
            </Button>
          )}

          </div>
        </td>
      </tr>
    ));

    return (
      <Table striped bordered hover variant="dark" responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Creator</th>
            <th>Shop</th>
            <th>Status</th>
            <th>Contributors</th>
            <th>Creation date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{ordersRows}</tbody>
      </Table>
    );
  }

  function body() {
    if (loading) return <>loading...</>;
    return (
      <>
        <h1 className="text-center">Join order</h1>
        <div className="d-flex justify-content-center">
          <Button variant="success" onClick={createOrder}>
            + Create order
          </Button>
        </div>
        <hr />
        {ordersTable()}
      </>
    );
  }

  return (
    <>
      <div id="page">
        <Container>
          <Row>
            <Col className="mt-4">{body()}</Col>
          </Row>
        </Container>
        <ConfirmationPopup ref={modalRef}/>
      </div>
    </>
  );
};

export default OrdersScreen;
