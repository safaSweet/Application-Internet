import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import { Outlet, useNavigate } from "react-router-dom";
import { LOGOUT } from "../Auth/Service";

function HomePage() {
  const navigate = useNavigate();
  const logo=require('../Images/AI.jpg')
  return (
    <>
      <Navbar bg="light" data-bs-theme="light" className=" mb-2">
          <Navbar.Brand className=" fs-4 ms-5">
          <img
              src={logo}
              width="50"
              height="30"
              
              // className="d-inline-block align-top"
              alt="logo"
            />
          </Navbar.Brand>
          
        <Container >
          
          <Nav className="me-auto fw-bold" style={{display:'contents'}}>
            <Nav.Link onClick={() => navigate("/", { replace: true })}>
              Folders
            </Nav.Link>
            <Nav.Link onClick={()=>LOGOUT()}>
              Logout
            </Nav.Link>
          </Nav>
          
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}

export default HomePage;
