import React from "react";
import { Button, Form, Modal } from "react-bootstrap";

interface ConfirmationPopupProps {
    title?:string,
    onSubmit?:VoidFunction,
    onCancel?:VoidFunction,
    onHide?:VoidFunction,
}

interface ConfirmationPopupState extends ConfirmationPopupProps{
    show:boolean    
}
 
class ConfirmationPopup extends React.Component<any, ConfirmationPopupState> {
 
    state = {show :false,title:"",onSubmit:undefined,onCancel:undefined,onHide:undefined}
    
    ///ALWAYS resets modal after successfully submit
    show(props:ConfirmationPopupProps)
    {
        this.setState({show: true,...props})
    }

    reset()
    {
        this.setState({show:false,title:"",onSubmit:undefined})
    }

    hide()
    {
        this.setState({...this.state,show: false,});
    }

    private onHide()
    {
        this.setState({...this.state,show: false,})
        if(this.state.onHide)
            this.state.onHide();
    }

    private onCancel()
    {
        this.setState({...this.state,show: false})
        if(this.state.onCancel)
            this.state.onCancel();
    }

    private onSubmit()
    {
        if(this.state.onSubmit)
            this.state.onSubmit();        
        this.reset();
    }

    render() { 
        return (
            <Modal show={this.state.show} onHide={()=>this.onHide()} variant="dark">
            <Modal.Header closeButton>
              <Modal.Title>Confirm action</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Label >
                  <div className="d-flex flex-column">
                    <span>
                      {`Do you want to proceed with this action${this.state.title?":":""}`}
                    </span>
                    <span>
                      {this.state.title}
                    </span>
                  </div>
                </Form.Label>                
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={()=>this.onCancel()}>
                Close
              </Button>
              <Button variant="primary" onClick={()=>this.onSubmit()}>
                Submit
              </Button>
            </Modal.Footer>
          </Modal>
          );
    }
}
 
export default ConfirmationPopup;