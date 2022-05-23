import Shop from "models/shop";
import MenuItem from "models/menuItem";
import { FunctionComponent,useState,useReducer,   } from "react";
import { Col, Container, Row,Form, Table, Button } from "react-bootstrap";
import "./createShopScreen.css";
import AppState from "mocks/appState";
import { useNavigate } from "react-router-dom";

interface CreateShopProps {
    
}
 
const CreateShopScreen: FunctionComponent<CreateShopProps> = () => {
    
    const [activeItem, setActiveItem] = useState<MenuItem>({name:"",price:0});
    let navigate = useNavigate();
    const initialState:Shop = {menu:[],vatPercentage:14 };
    const [shop, updateShop] = useReducer(
        (shop: Shop, updates: Shop) => ({
            ...shop,
            ...updates,
        }),
        initialState
    );

    function addMenuItem(item:MenuItem)
    {
        shop?.menu?.push(item);
        updateShop({});
        setActiveItem({name:"",price:0});
    }

    function deleteMenuItem(index:number)
    {
        shop?.menu?.splice(index,1);
        updateShop({});
    }

    function onCreateShop()
    {        
        //should be creation to firebase or api
        shop.id = Math.random().toString();
        AppState.shops.push(JSON.parse(JSON.stringify(shop)) as any);
        navigate(-1);
    }

    //UI
    function nameField()
    {
        return <>
        <Form.Label>Shop name</Form.Label>
        <Form.Control type="text" placeholder="Shabrawy" onChange={(event)=>updateShop({name:event.target.value})}/>
        </>
    }

    function vatField()
    {
        return <>
        <Form.Label>VAT</Form.Label>
        <Form.Control type="number" placeholder="14%" value={14} onChange={(event)=>updateShop({vatPercentage:Number(event.target.value)})}/>
        </>
    }

    function deliveryField()
    {
        return <>
        <Form.Label>Delivery</Form.Label>
        <Form.Control type="number" placeholder="x EGP" onChange={(event)=>updateShop({delivery:Number(event.target.value)})}/>
        </>
    }

    function addMenuItemRow()
    {
        return <tr>
            <td>0</td>
            <td>
                <Form.Control type="text" placeholder="input name" onChange={(event)=>setActiveItem(({...activeItem,name:event.target.value}))} value={activeItem.name}/>            
            </td>
            
            <td>            
                <Form.Control type="number" placeholder="input price" onChange={(event)=>setActiveItem({...activeItem,price:Number(event.target.value)})} value={activeItem.price}/>            
            </td>  

            <td>
                <Button variant="primary" className='text-center' onClick={()=>addMenuItem(activeItem)}  disabled={!activeItem.name}>Create new item</Button>
            </td>
        </tr>
    }

    function menuTable()
    {
        const menuItems = shop.menu?.map(
            (item,index) =>    
            <tr key={index+1}>
                <td>{index+1}</td>
                <td>{item.name}</td>
                <td>{item.price} EGP</td>
                <td><Button variant="danger" onClick={()=>deleteMenuItem(index)}>Delete</Button></td>
            </tr> 
            );
        return <Table striped bordered hover variant="dark" responsive>
            <thead>
                <tr>
                <th>#</th>
                <th>Name</th>
                <th>Price</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {addMenuItemRow()}
                {menuItems}
            </tbody>
        </Table>
    }

    return ( 
        <>
        <div id="page">
            <Container className="">
                <Row>
                    <Col>
                        <h1 className="text-center">Create shop</h1>
                        <hr />
                    </Col>
                </Row>
                <Row className="pt-3">
                    <Col>{nameField()}</Col>
                    <Col>{deliveryField()}</Col>
                    <Col>{vatField()}</Col>
                </Row>
                <Row className="mt-5">
                    <Col>
                    <h1 className="text-center">Menu <small className="text-small">(Optional)</small></h1>
                    {menuTable()}
                    </Col>
                </Row>
                <Row>
                    <Col className="text-center">
                    <Button onClick={onCreateShop}>Create shop</Button>
                    </Col> 
                </Row>
            </Container>
        </div>
        </>
     );
}
 
export default CreateShopScreen;