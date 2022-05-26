import { doc } from "firebase/firestore";
import AppState from "mocks/appState";
import MenuItem from "models/menuItem";
import { OrderRequest } from "models/orderRequest";
import Shop from "models/shop";
import { FunctionComponent, useEffect, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { useDocument } from "react-firebase-hooks/firestore";
import { useParams } from "react-router-dom";
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

interface UserOrderTableProps {
    requests:OrderRequest[],
    shopId:string
}
 
const UserOrderTable: FunctionComponent<UserOrderTableProps> = (props) => {
    const [shop, setShop] = useState<Shop>();
    let [shopSnapshot, loadingCollection, shopError] = useDocument(
        doc(AppState.fireStore, `shops/${props.shopId}`),
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        }
    );
    useEffect(() => {
        setShop(shopSnapshot?.data() as Shop);
        console.log('menu',shopSnapshot?.data()?.menu);
        
    }, [shopSnapshot])
    
    const [curReq, setcurReq] = useState(props.requests);
    const [newRequest, setNewRequest] = useState<OrderRequest|undefined>();
    
    ///methods
    const handleOnSelect = (item) => {
        newRequest.item = item;
        setNewRequest({
            ...newRequest,
            item:item
        });
    }

    const handleOnClear = () => {
        setNewRequest(
            {
                ...newRequest,
                item:undefined
            }
        );
    }

    function addNewRequest()
    {
        newRequest.date_modified = Date.now();
        setcurReq([...curReq,newRequest])
        console.log("curReq",[...curReq,newRequest]);
    } 

    const formatResult = (item) => {
        return (
            <>
                <span style={{ display: 'block', textAlign: 'left' }}>{`${item.name} (${item.price} EGP)`} </span>
            </>
        )
    }
    
    function addNewItemField()
    {
        return  <Table striped bordered hover variant="dark" responsive>
            <thead>
            <tr>
                <th>#</th>
                <th style={{width:"300px"}}>item</th>
                <th style={{width:"100px"}}>quantity</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            <tr>
            <td>0</td>
            <td>
            <ReactSearchAutocomplete
            placeholder="Search for an item"
            items={shop?.menu as MenuItem[]}
            onSelect={handleOnSelect}
            onClear={handleOnClear}
            autoFocus
            formatResult={formatResult}
          />
            </td>
            <td>
                <Form.Control 
                type="number" 
                placeholder="input quantity" 
                onChange={
                    (event)=>setNewRequest({
                    ...newRequest,
                    quantity:Number(event.target.value)
                })} 
                value={newRequest?.quantity??0} />
            </td>
            <td>
            <Button variant="primary" className='text-center' onClick={()=>{addNewRequest()}}  disabled={!newRequest.item}>add item</Button>

            </td>
            
        </tr>
        </tbody>
        </Table>
        
    }

    function addNewItemRow()
    {
        return <tr>
            <td>0</td>
            <td colSpan={3}>
            <ReactSearchAutocomplete
            placeholder="Search for an item"
            items={shop?.menu as MenuItem[]}
            onSelect={handleOnSelect}
            autoFocus
            formatResult={formatResult}
          />
            </td>
            <td>
                <Form.Control 
                type="number" 
                placeholder="input quantity" 
                onChange={
                    (event)=>setNewRequest({
                    ...newRequest,
                    quantity:Number(event.target.value)
                })} 
                value={newRequest?.quantity??0} />
            </td>
            {/* <td>            
                />            
            </td>  

            <td>
                <Button variant="primary" className='text-center' onClick={()=>addMenuItem(activeItem)}  disabled={!activeItem.name}>Create new item</Button>
            </td> */}
        </tr>
    }

    function requestTable()
    {
        const requestItems = curReq?.map(
            (request,index) =>    
            <tr key={index+1}>
                <td>{index+1}</td>
                <td>{request.item?.name}</td>
                <td>{request.quantity}</td>
                <td>{request.item?.price}</td>
                <td>{(new Date(request.date_modified as number)).toUTCString()}</td>                
                {/* <td><Button variant="danger" onClick={()=>deleteItem(index)}>Delete</Button></td> */}
            </tr> 
            );
        return <Table striped bordered hover variant="dark" responsive>
            <thead>
                <tr>
                <th>#</th>
                <th>Item</th>
                <th>Quantity</th>
                <th>Unit price</th>
                <th>Date</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {requestItems}
            </tbody>
        </Table>
    }
    return ( <>
        {addNewItemField()}
        {requestTable()}
    </> );
}
 
export default UserOrderTable;