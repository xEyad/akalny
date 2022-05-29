import { doc } from "firebase/firestore";
import AppState from "mocks/appState";
import MenuItem from "models/menuItem";
import { OrderRequest } from "models/orderRequest";
import Shop from "models/shop";
import { FunctionComponent, useEffect, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { useDocument } from "react-firebase-hooks/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
const lodash = require('lodash');

interface UserOrderTableProps {
    requests:OrderRequest[],
    shopId:string,
    onSubmitRequest:(req:OrderRequest[]|undefined)=>void
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
    
    const [curOrderRequest, setcurReq] = useState(props.requests);
    const [newItemRequest, setNewRequest] = useState<OrderRequest|undefined>();

    ///methods
    const handleOnSelect = (item:MenuItem) => {
        
        setNewRequest({
            ...newItemRequest,
            item:item,
            user:AppState.activeUser
        });
    }


    const handleOnClear = () => {
        setNewRequest(
            {
                ...newItemRequest,
                item:undefined
            }
        );
    }

    function addNewRequest()
    {
        newItemRequest.date_modified = Date.now();
        //check if item exists
        const foundIdx = curOrderRequest.findIndex((req)=>
            req.item.name == newItemRequest.item.name && 
            req.item.price == newItemRequest.item.price
        );
        if(foundIdx!=-1)
        {
            const newQuantity = curOrderRequest[foundIdx].quantity + newItemRequest.quantity;
            updateRequest(foundIdx,{...curOrderRequest[foundIdx],quantity:newQuantity})
        }
        else
        {
            newItemRequest.quantity = newItemRequest?.quantity||1;
            setcurReq([...curOrderRequest,newItemRequest])
        }
       
    } 

    function updateRequest(index,newReq:OrderRequest)
    {
        curOrderRequest[index] = newReq;
        setcurReq([...curOrderRequest])
    }

    const formatResult = (item) => {
        return (
            <>
                <span style={{ display: 'block', textAlign: 'left' }}>{`${item.name} (${item.price} EGP)`} </span>
            </>
        )
    }
        
    function deleteItem(index)
    {
        curOrderRequest.splice(index,1);
        setcurReq([...curOrderRequest])
    }

    

    //UI
      
    function addNewItemField()
    {
        return  <Table striped bordered hover variant="dark" responsive>
            <thead>
            <tr>
                <th>Selected item</th>
                <th style={{width:"300px"}}>item</th>
                <th style={{width:"100px"}}>quantity</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            <tr>
            <td>{newItemRequest?.item?.name || 'nothing'}</td>
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
                    ...newItemRequest,
                    quantity:Number(event.target.value)
                })} 
                value={newItemRequest?.quantity||1} />
            </td>
            <td>
            <Button variant="primary" className='text-center me-2' onClick={()=>{addNewRequest()}}  disabled={!newItemRequest?.item}>Add item</Button>
            <Button variant="primary" className='text-center' onClick={()=>{setNewRequest({} as any)}}  disabled={!newItemRequest?.item}>Reset selection</Button>

            </td>
            
        </tr>
        </tbody>
        </Table>
        
    }

    

    function requestTable()
    {
        const requestItems = curOrderRequest?.map(
            (request,index) =>    
            <tr key={index+1}>
                <td>{index+1}</td>
                <td>{request.item?.name}</td>
               <td>
               <Form.Control
                type="number" 
                onChange={
                    (event)=>{
                        updateRequest(index,{...request,quantity:Number(event.target.value)});                        
                    }
                } 
                value={request.quantity||1} />
               </td>
                <td>{request.item?.price}</td>
                <td>{(new Date(request.date_modified as number)).toUTCString()}</td>                
                <td><Button variant="danger" onClick={()=>deleteItem(index)}>Delete</Button></td>
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

    function submitBtn()
    {
        return (<>
        <div className="text-center w-100">
        <Button variant="success" className="text-center" onClick={()=>props.onSubmitRequest(curOrderRequest)}>Submit</Button>
        </div>
        </>)
    }

    function body()
    {
        if(loadingCollection)
            return(<>loading..</>)
        else
        {
            return ( <>
                {addNewItemField()}
                {requestTable()}
                {submitBtn()}
            </> )
        }
    }

    return ( <>
        {body()}
    </> );
}
 
export default UserOrderTable;