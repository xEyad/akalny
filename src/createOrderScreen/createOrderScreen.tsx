import AppState from "mocks/appState";
import Shop from "models/shop";
import { useState,useEffect } from "react";
import { Col, Container, Row,Form, Table, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import './createOrderScreen.css';
function CreateOrderScreen() 
{
    //should be const
    let [shops, setShops] = useState<Shop[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
      setShops(AppState.shops);
    
      return () => {
        //do cleaning, possibly close firebase socket
      }
      //empty array, means run once
    }, [])
    
    function onDeleteShop(id:string)
    {
        const idx = shops.findIndex((item)=>item.id==id);
        
        setShops(shops.filter((item)=>item.id!=id))
    }

    function onEditShop(id:string)
    {
        const idx = shops.findIndex((item)=>item.id==id);
    }

    function onSelectShop(id:string)
    {
        const shop = shops.find((item)=>item.id==id);
        AppState.orders.push({
            is_active:true,
            owner:{id:'3',name:'sayed'},
            id:'5',
            shop:shop,
            requests:[]
        });
        navigate('/manageOrder/5')
    }

    function instructions()
    {
        return (
            <div className="d-flex justify-content-between align-items-center">
                <h5>Please select the shop to order from</h5>
                <Button><Link to="/createShop">+ Create new shop</Link></Button>
            </div>
        )
    }

    function shopsTable()
    {
        const shopRows = shops.map(
            (item,index) =>    
            <tr key={index+1}>
                <td>{index+1}</td>
                <td>{item.name}</td>
                <td>{item.delivery} EGP</td>
                <td>{item.vatPercentage} %</td>
                <td>{item.menu?.length||-1+1} </td>
                <td className="d-flex justify-content-center">
                    <Button variant="success" onClick={()=>{onSelectShop(item.id as string)}}>Select</Button>
                    <div className="mx-1"></div>
                    <Button variant="primary" onClick={()=>{}}>Edit</Button>
                    <div className="mx-1"></div>
                    <Button variant="danger" onClick={()=>{onDeleteShop(item.id as string)}}>Delete</Button>
                </td>
            </tr> 
            );
        return <Table striped bordered hover variant="dark" responsive>
            <thead>
                <tr>
                <th>#</th>
                <th>Name</th>
                <th>Delivery</th>
                <th>Vat</th>
                <th>Menu Items</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {shopRows}
            </tbody>
        </Table>
    }
    
    return ( 
    <>
    <div id="page">
        <Container>
            <Row>
                <Col>
                    <h1 className="text-center">Create order</h1>
                    <hr />
                </Col>
            </Row>
            <Row>
                <Col>
                    {instructions()}
                    <div className="my-2"></div>
                    {shopsTable()}
                </Col>
            </Row>
        </Container>
    </div>
    </> 
    );
}

export default CreateOrderScreen;