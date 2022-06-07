import {
  FunctionComponent,
  useState,
  useEffect,
  useRef,
} from "react";
import { Col, Container, Row, Form, Table, Button } from "react-bootstrap";
import "./orderDetailsScreen.css";
import AppState from "mocks/appState";
import { useNavigate, useParams } from "react-router-dom";
import { Order } from "models/order";
import { useDocument } from "react-firebase-hooks/firestore";
import {
  deleteDoc,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { FirebaseConverters } from "models/firebaseConverters";
import OrdersTable from "./components/ordersTable";
import PriceSummary from "./components/priceSummary";
import { OrderRequest } from "models/orderRequest";
import RequestsByUsers from "manageOrderScreen/requestsByUser";
import Utility from "models/utility";
import ConfirmationPopup from "../confrimationPopup/confrimationPopup";
import OrderItemsCollectiveTable from "./components/orderItemsCollectiveTable";
import { When } from "react-if";
import usersViewIcon from '../assets/icons/users-view.png';
import itemsViewIcon from '../assets/icons/items-view.png';
import defaultViewIcon from '../assets/icons/default-view.png';


const lodash = require("lodash");

interface OrderDetailsScreenProps {}

const OrderDetailsScreen: FunctionComponent<OrderDetailsScreenProps> = () => {
  //hooks
  const modalRef = useRef<ConfirmationPopup>();
  const classNames = require("classnames");
  const { id } = useParams();
  let [order, setOrder] = useState<Order>({} as any);
  const [orderSnapshot, loading, error] = useDocument(
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

  const navigate = useNavigate();
  const [curFilteredUser, setCurFilter] = useState<string>("All");
  const [curView, setCurView] = useState<"all" | "byUser" | "byItem">("all");

  //methods

  function onChangeRequest() {
    navigate(`/manageOrder/${id}`);
  }

  function onDeleteItem(req: OrderRequest, index: number) {
    const orderRef = doc(AppState.fireStore, "orders", `${id}`);
    const newOrder = lodash.cloneDeep(order);
    newOrder.requests.splice(index, 1);
    newOrder.shop = doc(AppState.fireStore, "shops", order.shop.id);
    setDoc(orderRef, newOrder);
  }

  async function deleteOrder() {
    deleteDoc(doc(AppState.fireStore, "orders", id));
    navigate("/orders");
  }

  function toggleOrderStatus() {
    const orderRef = doc(AppState.fireStore, "orders", id);
    const newOrder = lodash.cloneDeep(order);
    newOrder.is_active = !newOrder.is_active;
    newOrder.shop = doc(AppState.fireStore, "shops", newOrder.shop.id);
    setDoc(orderRef, newOrder);
  }

  ///based on a condition, show jsxElement or elseJSXelement
  function showIf(condition: boolean, jsxElement, elseJSXelement?) {
    if (condition) return jsxElement;
    else return elseJSXelement ? elseJSXelement : <></>;
  }

  //UI

  function deleteOrderBtn() {
    return showIf(
      AppState.activeUser.id == order.owner.id,
      <Button
        variant="danger"
        onClick={() => {
          const modalTitle = `Delete order by ${order.owner.name} with ${
            Utility.getUniqueUsers(order.requests).length
          } contributors`;
          modalRef.current.show({
            title: modalTitle,
            onSubmit: () => deleteOrder(),
          });
        }}
      >
        Delete
      </Button>
    );
  }

  function toggleOrderStatusBtn() {
    return showIf(
      AppState.activeUser.id == order.owner.id,
      <Button
        variant="primary"
        onClick={() => {
          toggleOrderStatus();
        }}
      >
        Toggle status
      </Button>
    );
  }

  function changeRequestBtn() {
    if (!order.is_active) return <></>;
    let label = "Add items to order";
    if (order.requests.find((req) => req.user.id == AppState.activeUser.id))
      label = "Update/change your order";
    return <Button onClick={onChangeRequest}>{label}</Button>;
  }

  function ToggleViewBtns() {
    return (
      <div className="d-flex flex-column">
        <span style={{marginBottom:"0.5rem"}}>Alternative views</span>
        <div className="d-flex">

        <img 
            className={`icon-btn${curView == "all"?"-active":""}`}
            title="Switch to default view"
            src={defaultViewIcon}
              onClick={() => setCurView("all")}
              alt="" />  
         
          <img 
            className={`icon-btn${curView == "byItem"?"-active":""}`}
            src={itemsViewIcon}
              onClick={() => setCurView("byItem")}
              title="Switch to items view"
              alt="" />          

          <img 
            className={`icon-btn${curView == "byUser"?"-active":""}`}
            src={usersViewIcon} 
            onClick={() => setCurView("byUser")}
            title="Switch to user view"
            alt="" />

        </div>
      </div>
    );
  }

  function orderMetaDetails() {
    return (
      <>
        <Table variant="dark" responsive>
          <thead>
            <tr>
              <td colSpan={2}>Order Basic Information</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Creator</td>
              <td>{order.owner.name}</td>
            </tr>

            <tr>
              <td>Shop</td>
              <td>{order.shop.name}</td>
            </tr>

            <tr>
              <td>Status</td>
              <td className={statusStyle()}>
                {order.is_active ? "Active" : "In-active"}
              </td>
            </tr>
            <tr>
              <td>Available Actions</td>
              <td>
                <div className="d-flex justify-content-center">
                  {changeRequestBtn()}
                  <div className="me-2"></div>
                  {toggleOrderStatusBtn()}
                  <div className="me-2"></div>
                  {deleteOrderBtn()}
                </div>
              </td>
            </tr>
          </tbody>
        </Table>
      </>
    );
  }

  function FiltersCols() {
    return <>
    <Col>
      <When condition={curView != "byUser"}>
        <UsersFilter/>
      </When>
    </Col>
    <Col>
      <ToggleViewBtns/>
    </Col>
    </>
  }

  function UsersFilter()
  {
    const users = Utility.getUniqueUsers(order.requests);

    const options = users.map((user) => (
      <option key={user.id} value={user.id}>
        {user.name}
      </option>
    ));

    return (
      <>
        <Form.Label>Filter by user</Form.Label>
        <Form.Select
          value={curFilteredUser}
          onChange={(ev) => {
            setCurFilter(ev.currentTarget.value);
          }}
        >
          <option value={"All"}>All</option>
          {options}
        </Form.Select>
      </>
    );
  }

  function view() {
    if (curView == "all") {
      return (
        <>
          <OrdersTable
            order={order}
            onDeleteItem={onDeleteItem}
            onEditItem={onChangeRequest}
            filterByUserId={curFilteredUser}
          ></OrdersTable>
          <When condition={order.requests?.length}>
            <PriceSummary
              order={order}
              filterByUserId={curFilteredUser}
            ></PriceSummary>
          </When>
        </>
      );
    } else if (curView == "byUser") {
      return <RequestsByUsers order={order}></RequestsByUsers>;
    } else if (curView == "byItem") {
      return (
        <>
          <OrderItemsCollectiveTable
            order={order}
            filterByUserId={curFilteredUser}
          ></OrderItemsCollectiveTable>
        </>
      );
    }
  }

  function body() {
    if (loading || !order.shop)
      return <h3 className="center w-100">Loading..</h3>;

    return (
      <>
        <div id="page" className="overflow-auto">
          <Container>
            <Row>
              <Col>
                <h1 className="text-center">Order</h1>
                <h3 className="text-center">( {order.id} )</h3>
                {orderMetaDetails()}
                <hr />
              </Col>
            </Row>

            <Row className="mb-4">
                <FiltersCols/>
            </Row>

            <Row>
              <Col>{view()}</Col>
            </Row>
          </Container>
          <ConfirmationPopup ref={modalRef} />
        </div>
      </>
    );
  }

  function statusStyle(): string {
    return classNames(
      { "order-active": order?.is_active },
      { "order-dead": !order?.is_active }
    );
  }

  return body();
};

export default OrderDetailsScreen;
