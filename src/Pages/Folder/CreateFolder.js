import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { createRepo } from "./Slice_Repo";
function CreateFolder() {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const dispatch=useDispatch();
  const error=useSelector((state)=>state.Repo.error)
  const handleChange = (e) => {
    setName({ ...name, [e.target.name]: e.target.value });
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handlerSubmit = async(e) => {
       e.preventDefault();
        dispatch(createRepo(name));
        handleClose();
  };

  return (
    <>
      <span onClick={handleShow} className="icon">
        <BsFillPlusCircleFill />
      </span>
      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handlerSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Add Folder</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                placeholder="Folder Name"
                autoFocus
                onChange={handleChange}
                name="name"
                required
              /> 
            </Form.Group>
            {/* {error&&<p>error in input</p>} */}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" variant="primary" >
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
export default CreateFolder;
