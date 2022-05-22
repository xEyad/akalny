import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { Row,Col } from 'react-bootstrap';
import './Login.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import {
    BrowserRouter as Router,
    Route,
    Routes,
    Link
  } from "react-router-dom";

  
function Login() {
    return <div className='login'>
        <Container className='h-100 d-flex justify-content-center align-content-center'>
            <Row className=''>
                <Col className='h-100 d-flex flex-column justify-content-center'>
                    <LoginBox></LoginBox>           
                </Col>
            </Row>
        </Container>
    </div>
}

function LoginBox() {
    const [name, setName] = useState("");
    return (  
        <div className='loginBox'>
            <h1 className='text-center'>عايز أكُل</h1>
            <hr />
            <Form.Label>Your name </Form.Label>
            <Form.Control type="text" placeholder="hamdy el sokra" onChange={event=>setName(event.target.value)}/>
            <hr />
            <div className='text-center'>
                <Button variant="primary" className='text-center'>Submit</Button>{' '}
            </div>
        </div>
    );
}


export default Login;