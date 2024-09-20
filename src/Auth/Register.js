/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from "react";
import { Col, Container, Row, Form, Button, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { register } from "./RegisterSlice";
import Forms from "../Components/Forms";

function Register() {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    name: "",
    password: "",
    password_confirmation: "",
    email: "",
  });
  const error = useSelector((state) => state.Register.error);
  const loading = useSelector((state) => state.Register.loading);

  const HandlerSubmit = async (e) => {
    e.preventDefault();
    dispatch(register(data));
  };
  const handlerChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  console.log('...........',data.email)
  return (
    <Container fluid className="p-3 my-5 h-custom">
      <Row>
        <Col col="10" md="6">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            className="img-fluid"
            alt="Sample image"
          />
        </Col>
        <Col col="4" md="6" style={{ marginTop: "8%" }}>
          <Form onSubmit={HandlerSubmit}>
            <Forms
              HandlerSubmit={HandlerSubmit}
              handlerChange={handlerChange}
              placeholder="Email"
              name="email"
              type="email"
            />
            <Forms
              HandlerSubmit={HandlerSubmit}
              handlerChange={handlerChange}
              placeholder="User Name"
              name="name"
              type="text"
            />
            <Forms
              HandlerSubmit={HandlerSubmit}
              handlerChange={handlerChange}
              placeholder="Password"
              name="password"
              type="password"
            />
            <Forms
              HandlerSubmit={HandlerSubmit}
              handlerChange={handlerChange}
              placeholder="Password Confirmation"
              name="password_confirmation"
              type="password"
            />
            <div className="text-center text-md-start mt-4 pt-2">
              {loading ? (
                <Spinner animation="border" role="status" />
              ) : (
                <Button
                  className="mb-0 px-5"
                  size="lg"
                  type="submit"
                  onLoad={loading}
                >
                  Save
                </Button>
              )}

              {error && (
                <p className=" error">
                  it 's found an error in user name or password
                </p>
              )}
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
export default Register;
