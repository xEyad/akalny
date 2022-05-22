import { FunctionComponent } from "react";
import { Col, Container, Row,Form, Table } from "react-bootstrap";
import "./createShop.css";

interface CreateShopProps {
    
}
 
const CreateShop: FunctionComponent<CreateShopProps> = () => {

    //UI

    function nameField()
    {
        return <>
        <Form.Label>Shop name</Form.Label>
        <Form.Control type="text" placeholder="Shabrawy" />
        </>
    }

    function vatField()
    {
        return <>
        <Form.Label>VAT</Form.Label>
        <Form.Control type="number" placeholder="14%" value={14} />
        </>
    }

    function deliveryField()
    {
        return <>
        <Form.Label>Delivery</Form.Label>
        <Form.Control type="text" placeholder="x EGP" />
        </>
    }

    function menuTable()
    {
        return <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                </tr>
                <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
                </tr>
                <tr>
                <td>3</td>
                <td colSpan={2}>Larry the Bird</td>
                <td>@twitter</td>
                </tr>
            </tbody>
        </Table>
    }

    return ( 
        <>
        <div id="page">
            <Container className="">
                <Row>
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
            </Container>
        </div>
        </>
     );
}
 
export default CreateShop;