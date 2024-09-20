import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { Card, CardBody, CardFooter, CardHeader } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { VERIFY } from "./Service";
function VerifyPage() {
  const [name, setName] = useState({
    email: "",
    code: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setName({ ...name, [e.target.name]: e.target.value });
  };
  const handlerSubmit = async (e) => {
    e.preventDefault();
    VERIFY(name);
    navigate("/", { replace: true });
  };

  return (
    <>
      <Card style={{ width: "60%", margin: "10%" }}>
        <Form onSubmit={handlerSubmit}>
          <CardHeader closeButton>
            <Modal.Title>Sure for you</Modal.Title>
          </CardHeader>
          <CardBody>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                placeholder="Email"
                autoFocus
                onChange={handleChange}
                name="email"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Control
                type="text"
                placeholder="Verify Code"
                autoFocus
                onChange={handleChange}
                name="code"
              />
            </Form.Group>
          </CardBody>
          <CardFooter>
            <Button
              type="submit"
              style={{ marginRight: "50%", marginBottom: "2%" }}
              variant="primary"
            >
              Save
            </Button>
          </CardFooter>
        </Form>
      </Card>
    </>
  );
}

export default VerifyPage;
