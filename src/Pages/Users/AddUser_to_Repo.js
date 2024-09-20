import React from "react";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import GetUsers from "../../Components/GetUsers";
import { useDispatch } from "react-redux";
import { AddUser } from "./SliceUser";

export default function AddUser_to_Repo({ id }) {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const [data, setData] = useState({
    user_id: "",
    repo_id: id,
  });
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();
    dispatch(AddUser(data));
  };
  return (
    <>
      <span
        onClick={handleShow}
        style={{ cursor: "pointer", marginLeft: "80%" }}
      >
        <BsFillPersonPlusFill
          fontSize="33px"
          style={{ transform: "translate(6px, 200px)" }}
        />
      </span>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handlerSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Select
                aria-label="Default select example"
                onChange={handleChange}
                name="user_id"
              >
                <option>Users</option>
                <GetUsers />
              </Form.Select>
            </Form.Group>

            <Modal.Footer>
              <Button type="submit" variant="primary" onClick={handleClose}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
