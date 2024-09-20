import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createFile } from "./Slice_File";

function CreateFile(props) {
  const id_repo=props.id;
  const dispatch=useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [form, setform] = useState({
    file: null, 
    repo_id: id_repo,
  });
  const handleChange = (e) => {
    setform({
      ...form,
      [e.target.name]:
       e.target.name === "file" ? e.target.files[0] : e.target.value,
    });
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", form.file);
    formData.append("repo_id", form.repo_id);
    try {
     dispatch(createFile(formData));
     handleClose();
      
    } catch (error) {
      console.error("حدث خطأ أثناء تحميل الملف:", error);
    }
  };

  return (
    <>
      <span onClick={handleShow} className="icon">
        <BsFillPlusCircleFill />
      </span>
      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handlerSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Add File</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="file"
                placeholder="File"
                autoFocus
                onChange={handleChange}
                name="file"
                required
              />
            </Form.Group>
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

export default CreateFile;