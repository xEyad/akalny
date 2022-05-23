import { FunctionComponent } from "react";

interface UserOrderTableProps {
    
}
 
const UserOrderTable: FunctionComponent<UserOrderTableProps> = () => {
    function addMenuItemRow()
    {
        return <tr>
            <td>0</td>
            {/* <td>
                <Form.Control type="text" placeholder="input name" onChange={(event)=>setActiveItem(({...activeItem,name:event.target.value}))} value={activeItem.name}/>            
            </td>
            
            <td>            
                <Form.Control type="number" placeholder="input price" onChange={(event)=>setActiveItem({...activeItem,price:Number(event.target.value)})} value={activeItem.price}/>            
            </td>  

            <td>
                <Button variant="primary" className='text-center' onClick={()=>addMenuItem(activeItem)}  disabled={!activeItem.name}>Create new item</Button>
            </td> */}
        </tr>
    }

    function menuTable()
    {
        // const menuItems = shop.menu?.map(
        //     (item,index) =>    
        //     <tr key={index+1}>
        //         <td>{index+1}</td>
        //         <td>{item.name}</td>
        //         <td>{item.price} EGP</td>
        //         <td><Button variant="danger" onClick={()=>deleteMenuItem(index)}>Delete</Button></td>
        //     </tr> 
        //     );
        // return <Table striped bordered hover variant="dark" responsive>
        //     <thead>
        //         <tr>
        //         <th>#</th>
        //         <th>Name</th>
        //         <th>Price</th>
        //         <th>Actions</th>
        //         </tr>
        //     </thead>
        //     <tbody>
        //         {addMenuItemRow()}
        //         {menuItems}
        //     </tbody>
        // </Table>
    }
    return ( <></> );
}
 
export default UserOrderTable;