import Login from 'loginScreen/loginScreen';
import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
} from "react-router-dom";
import CreateShop from 'createShopScreen/createShopScreen';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';


function App() {

  function navbar()
  {
    return <Navbar bg="dark" variant="dark" expand="lg" >
      <Container>
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
      </Container>
    </Navbar>
  }

  return (
    <>
      {navbar()}
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/home" element={<Login/>} />

        <Route path="/createShop" element={<CreateShop/>} />
        <Route path="/shops" element={<CreateShop/>} />

        <Route path="/orders" element={<CreateShop/>} />
        <Route path="/createOrder" element={<CreateShop/>} />
        
        <Route path="/" element={<Login/>} />
      </Routes>
    </>
  );
}

export default App;
