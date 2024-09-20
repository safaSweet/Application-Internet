import React, { useState } from "react";
import { MDBContainer, MDBCol, MDBRow, MDBInput } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import { Form, Spinner } from "react-bootstrap";
import MD_BTN from "../Components/MD_BTN";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "./UserSlice";

function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const load = useSelector((state) => state.Auth.loading);
  const error = useSelector((state) => state.Auth.error);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const HandlerSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(addUser(data));
    } catch (error) {
      console.log(error);
    }
  };
  const handlerChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  return (
    <MDBContainer fluid className="p-3 my-5 h-custom">
      <MDBRow>
        <MDBCol col="10" md="6">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            className="img-fluid"
            alt="Sample image"
          />
        </MDBCol>
        <MDBCol col="4" md="6" style={{ marginTop: "8%" }}>
          <Form onSubmit={HandlerSubmit}>
            <MDBInput
              className="mb-4"
              placeholder="Email"
              id="formControlLg1"
              type="text"
              size="lg"
              name="email"
              onChange={handlerChange}
            />
            <MDBInput
              className="mb-4"
              placeholder="Password"
              id="formControlLg2"
              type="password"
              size="lg"
              name="password"
              onChange={handlerChange}
            />
            <div className="text-center text-md-start mt-4 pt-2">
              {load ? (
                <Spinner animation="border" role="status" />
              ) : (
                <MD_BTN name="Login" color="primary" type="submit" />
              )}
              {error && (
                <p
                  className="error "
                >
                  it is found error with user name or password
                </p>
              )}
              <p className="small fw-bold mt-2 pt-1 mb-2">
                Don't have an account?
                <span
                  className="link-danger"
                  onClick={() => navigate("/Register", { replace: true })}
                  type="submit"
                >
                  Register
                </span>
              </p>
            </div>
          </Form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
export default Login;
