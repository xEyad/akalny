import React, { useState,useEffect, useRef, FunctionComponent } from 'react';
import { Container } from 'react-bootstrap';
import { Row,Col } from 'react-bootstrap';
import './loginScreen.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {
    useNavigate 
  } from "react-router-dom";
import { collection,doc, setDoc, addDoc, getDocs } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import AppState from 'mocks/appState';
import { User } from 'models/user';
  
interface LoginScreenProps {
    onUserSet:{(user:User):any}
}
 
const Login: FunctionComponent<LoginScreenProps> = (props) => {
    //hooks
    const [creationName, setcreationName] = useState<string|undefined>("");
    const [user, setUser] = useState<User|undefined>(AppState.activeUser || {'id':"defaulttto"});
    const [creationMode, setCreationMode] = useState<"create"|"select">("select");
    const navigate = useNavigate();
    let [usersSnapshot, loadingCollection, error] = useCollection(
        collection(AppState.fireStore, 'users'),
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        }
    );


    //methods
    function onCreateOrder(){
        AppState.setActiveUser(user as User);
        navigate('/createOrder')
    }
    function onJoinOrder(){
        AppState.setActiveUser(user as User);
        navigate('/orders')
    }
    function getUsers():User[] {
        const users = usersSnapshot?.docs.map((userDoc)=>{
        const user = (userDoc.data() as User);
        user.id = userDoc.id;
        return user;
        });
        return users as User[];
    }

    function canPass():boolean{        
        if(user && user.id != "defaulttto")
            return true
        else
            return false;
    }    

    function onUserSelected(user:User)
    {
        setUser(user);
        if(props?.onUserSet)
            props.onUserSet(user);  
    }

    function changeCreationMode(mode:"create" | "select")
    {
        setCreationMode(mode);
        setUser({'id':"defaulttto"});
    }

    async function onCreateUser(name:string) 
    {
        const docRef = await addDoc(collection(AppState.fireStore,'users'),{'name':name});
        changeCreationMode("select");
        usersSnapshot = (await getDocs(collection(AppState.fireStore,'users'))); //TODO: not best practice, but it works   
        setUser(getUsers().find((user)=>user.id == docRef.id)) 
        setcreationName(undefined);
    }

    //UI    

    
    return <div className='login'>
        <Container className='h-100 d-flex justify-content-center align-content-center'>
            <Row className=''>
                <Col className='h-100 d-flex flex-column justify-content-center'>
                    {loginBox()}  
                </Col>
            </Row>
        </Container>
    </div>

    function authField()
    {
        if(creationMode=="select")
            return selectUserField()
        else if(creationMode=="create")
            return createUserField();
        else
            return (<>ERROR</>);
    }

    function loginBox() 
    {        
        return (  
            <div className='loginBox'>
                <h1 className='text-center'>عايز أكُل</h1>
                <hr />
                {authField()}
                <hr />
                <div className='text-center d-flex justify-content-center'>
                    <Button variant="primary" className='text-center' onClick={onJoinOrder} disabled={!canPass()}>Join order</Button>
                    <div style={{width:'20px'}}></div>
                    <Button variant="primary" className='text-center' onClick={onCreateOrder}  disabled={!canPass()}>Create new order</Button>
                </div>
            </div>
        );
    }

    function selectUserField()
    {
        if(loadingCollection)
        {
            return <p>loading...</p>
        }
        const options = getUsers().map(                
            (user)=>(<option key={user.id} value={user.id}>{user.name}</option>)
        )
        return <>
            <Form.Label>
                Select yourself from existing users or 
                <span className='link-btn' onClick={()=>changeCreationMode("create")}> Add new</span>
            </Form.Label>
            <Form.Select 
            value={user?.id as string | 'defaulttto'}
            onChange={    
                (ev)=>{
                    const selectedUser = getUsers().find((user,i,arr)=>user.id == ev.currentTarget.value) as User;
                    onUserSelected(selectedUser);
                } 
            }
            >
                <option disabled value={'defaulttto'}>Please select user</option>
                {options}
            </Form.Select>
        </>
    }

    function createUserField()
    {
        return <>
            <Form.Label>Make Your user or <span className='link-btn'onClick={()=>changeCreationMode("select")}> Select from existing users</span> </Form.Label>
            <div className="d-flex">
                <Form.Control type="text" placeholder="hamdy el sokra" value={creationName} onChange={(ev)=>setcreationName(ev.currentTarget.value)}/>
                <Button className='ms-2' disabled={!creationName} onClick={()=>onCreateUser(creationName as string)}>Create</Button>
            </div>
        </>
    }

}

export default Login;