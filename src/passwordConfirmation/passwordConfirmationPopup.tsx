import { FunctionComponent, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
const md5 = require('md5');

interface PasswordConfirmationPopupProps {
    show:boolean;
    title?:string;
    onHide?: () => void;
    onClose?: () => void;
    onSubmit: (isSuccess:boolean) => void;
}
 
const PasswordConfirmationPopup: FunctionComponent<PasswordConfirmationPopupProps> = (props) => {

    const [password, setPassword] = useState("");
    const [isWrongPass, setisWrongPass] = useState(false);


    function onSubmit() : void
    {
      const isPassCorrect = md5(password)=="6e06c82d83e0344fe9bb1abc94ba4547";
      setisWrongPass(!isPassCorrect);
      props.onSubmit(isPassCorrect);
      reset()
    }

    function reset()
    {
      setisWrongPass(false);
      setPassword('');
    }

    function onHide()
    {
      reset()
      props.onHide();
    }

    function onClose()
    {
      reset()
      props.onClose();
    }

    return ( <>
    <Modal show={props.show} onHide={onHide} variant="dark">
        <Modal.Header closeButton>
          <Modal.Title>Confirm action</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form.Label >
              <div className="d-flex flex-column">
                <span>
                  {`Enter THE password to do this action${props.title?":":""}`}
                </span>
                <span>
                  {props.title}
                </span>
              </div>
            </Form.Label>
            <div className="d-flex flex-column">
                <Form.Control type="text" placeholder="*******" value={password} onChange={(ev)=>setPassword(ev.currentTarget.value)}/>
                {
                  isWrongPass?<Form.Text className=" text-danger">
                    Wrong password!
                  </Form.Text> : ""
                }
                
            </div>
            
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" onClick={onSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </> );
}
 
export default PasswordConfirmationPopup;