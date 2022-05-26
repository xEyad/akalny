import Login from 'loginScreen/loginScreen';
import React, { useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
} from "react-router-dom";
import CreateShop from 'createShopScreen/createShopScreen';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import ShopsScreen from 'shopsScreen/shopsScreen';
import CreateOrderScreen from 'createOrderScreen/createOrderScreen';
import OrderDetailsScreen from 'orderDetailsScreen/orderDetailsScreen';
import AppState from 'mocks/appState';
import { User } from 'models/user';
import ManageOrderView from 'manageOrderScreen/manageOrderScreen';
import ManageOrderScreen from 'manageOrderScreen/manageOrderScreen';


function App() {
  const [activeUser, setactiveUser] = useState<User | undefined>();

  function navbar()
  {
    return <Navbar bg="dark" variant="dark" expand="lg" >
      <Container>
      <Nav
        className="me-auto my-2 my-lg-0"
        style={{ maxHeight: '100px' }}
        navbarScroll
      >
        <Navbar.Brand href="#home">عايز أكُل</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link> 
              <Link to="/home">Home</Link>
            </Nav.Link>

            <Nav.Link> 
              <Link to="/shops">Shops</Link>
            </Nav.Link>

            <Nav.Link> 
              <Link to="/orders">Orders</Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        </Nav>
        <span className='userName'>{activeUser?.name}</span>
      </Container>
    </Navbar>
  }

  return (
    <>
      {navbar()}
      <Routes>
        <Route path="/login" element={<Login onUserSet={setactiveUser}/>} />
        <Route path="/home" element={<Login onUserSet={setactiveUser}/>} />

        <Route path="/createShop" element={<CreateShop/>} />
        <Route path="/shops" element={<ShopsScreen/>} />

        <Route path="/orders" element={<CreateShop/>} />
        <Route path="/createOrder" element={<CreateOrderScreen/>} />

        <Route path="/viewOrder/:id" element={<OrderDetailsScreen/>} />
        <Route path="/manageOrder/:id" element={<ManageOrderScreen/>} />
        
        <Route path="/" element={<Login onUserSet={setactiveUser}/>} />
      </Routes>
    </>
  );
}

export default App;
