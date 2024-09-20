import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { url, downloadFile, editFile } from "../endPoint";

import { BsFillPencilFill } from "react-icons/bs";
function EditFile({ id, token, status }) {
  const [content, setContent] = useState("");
  const [show, setShow] = useState(false);

  const fetchContent = async () => {
    const response = await axios
      .post(
        `${url}/${downloadFile}`,
        { file_id: id },
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then((e) => e.data.content);
    const decryptedDa = atob(response);
    setContent(decryptedDa);
    return decryptedDa;
  };
  const handleClose = () => setShow(false);
  const handleShow = () => {
    if (status === "free") {
      window.alert("please chick in first");
    }
    else{
    setShow(true);
    fetchContent();
  }};

  const handlerSubmit = (e) => {
    // if (status === "free") {
    //   window.alert("please choose the files you want chick out");
    // } else {
      e.preventDefault();
      axios.post(
        `${url}/${editFile}`,
        { file_id: id, content: content },
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
    // }
  };
  const handleChange = (e) => {
    setContent(e.target.name === "file" ? e.target.files[0] : e.target.value);
  };
  return (
    <>
      <span onClick={() => handleShow()}>
        <BsFillPencilFill color="cadetblue" />
      </span>
      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handlerSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Edit File</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Content File</Form.Label>

              <Form.Control
                as="textarea"
                rows={8}
                type="text"
                onChange={handleChange}
                value={content}
                name="content"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default EditFile;
