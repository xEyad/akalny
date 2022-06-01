import AppState from "mocks/appState";
import Shop from "models/shop";
import { useState,useEffect } from "react";
import { Col, Container, Row,Form, Table, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { collection,doc, setDoc, addDoc, getDocs, DocumentReference, getDoc, deleteDoc } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import './createOrderScreen.css';
function CreateOrderScreen() 
{
    let [shopsSnapshot, loadingCollection, error] = useCollection(
        collection(AppState.fireStore, 'shops'),
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        }
    );
    useEffect(() => {
        const shops = shopsSnapshot?.docs.map((shopDoc)=>{
            const shop = (shopDoc.data() as Shop);
            shop.id = shopDoc.id;
            return shop;
            });
        setShops(shops as Shop[]);
    }, [shopsSnapshot])
    
    const [shops, setShops] = useState<Shop[]>([]);
    const navigate = useNavigate();

    
    function onDeleteShop(id:string)
    {
        deleteDoc(doc(AppState.fireStore, 'shops',id)); 
    }

    function onEditShop(id:string)
    {
    }

    async function onSelectShop(id:string)
    {
        const shop = shops.find((item)=>item.id==id);
        const docRef = await addDoc(collection(AppState.fireStore,'orders'),
        {
            is_active:true,
            owner:AppState.activeUser,
            shop: doc(AppState.fireStore,`shops/${shop?.id}`),
            requests:[],
            creation_date: Date.now()
        });
        navigate(`/viewOrder/${docRef.id}`);
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
        if(!shops || shops.length == 0)
        {
            return (<>
                <h3>Their are no shops found</h3>
            </>);
        }
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
                <Col className="mt-4">
                    <h1 className="text-center">Create order</h1>
                    <hr />
                </Col>
            </Row>
            <Row>
                <Col>
                    {instructions()}
                    <div className="my-2"></div>
                    {loadingCollection ?"Loading...":shopsTable()}
                </Col>
            </Row>
        </Container>
    </div>
    </> 
    );
}

export default CreateOrderScreen;