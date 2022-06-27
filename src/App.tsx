import Login from 'loginScreen/loginScreen';
import React, { FunctionComponent, useEffect, useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import CreateShop from 'createShopScreen/createShopScreen';
import { Container, ModalFooter, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import ShopsScreen from 'shopsScreen/shopsScreen';
import CreateOrderScreen from 'createOrderScreen/createOrderScreen';
import OrderDetailsScreen from 'orderDetailsScreen/orderDetailsScreen';
import AppState from 'mocks/appState';
import { User } from 'models/user';
import OrdersScreen from 'ordersScreen/ordersScreen';
import ManageOrderScreen from 'manageOrderScreen/manageOrderScreen';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth, onAuthStateChanged,signInAnonymously } from "firebase/auth";

function App() {
  const [activeUser, setactiveUser] = useState<User | undefined>(AppState.activeUser);
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(getAuth(AppState.firebaseApp));
  
  function navbar()
  {
    return <Navbar bg="dark" variant="dark" expand="lg" >
      <Container>
      <Nav
        className="me-auto my-2 my-lg-0"
        style={{ maxHeight: '100px' }}
        navbarScroll
      >
        <Navbar.Brand onClick={()=>navigate('/home')} className="clickable" >عايز أكُل</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={()=>navigate('/home')}> 
              Home
            </Nav.Link>

            <Nav.Link onClick={()=>navigate('/shops')}> 
              Shops
            </Nav.Link>

            <Nav.Link onClick={()=>navigate('/orders')}> 
              Orders
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        </Nav>
         <span className='userName'>Active user: {activeUser?.name || '-'} </span>
         <span className='ms-5'><a href="https://github.com/xEyad/akalny" target={"_blank"}><svg  style={{fill:"white"}} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></a></span>
      </Container>
    </Navbar>
  }

  function footer()
  {
    return <div className='footer'>
      ألف هنا يا زميلي
    </div>
  }

  return (
    !user? <div>Loading...</div> :
    <>
      {navbar()}
      <Routes>
        <Route path="/login" element={<Login onUserSet={setactiveUser}/>} />
        <Route path="/home" element={<Login onUserSet={setactiveUser}/>} />
        <Route path="/akalny" element={<Login onUserSet={setactiveUser}/>} />

        <Route path="/createShop" element={<CreateShop/>} />
        <Route path="/editShop/:id" element={<CreateShop/>} />
        <Route path="/shops" element={<ShopsScreen/>} />
        <Route path="/orders" element={<AuthGuard element={<OrdersScreen/>}/>   } />
        <Route path="/createOrder" element={<AuthGuard element={<CreateOrderScreen/>} />} />
        
        <Route path="/viewOrder/:id" element={<AuthGuard element={<OrderDetailsScreen/>} />} />
        <Route path="/manageOrder/:id" element={<AuthGuard element={<ManageOrderScreen/>} />} />

        
        <Route path="/" element={<Login onUserSet={setactiveUser}/>} />
      </Routes>
      {footer()}
    </>
  );
}

export default App;

///render component if user is authenticated otherwise, redirect to login

interface authGuardProps {
  element: JSX.Element
}
 
const AuthGuard: FunctionComponent<authGuardProps> = (props) => {
  const navigate = useNavigate();
  useEffect(() => {
    if(!AppState.activeUser)
      navigate('/login')
  
  }, )
  
  function body()
  {
    return AppState.activeUser?props.element:<></>;
  }
  return ( body());
}
 