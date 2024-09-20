import React from 'react'
import {MDBBtn } from "mdb-react-ui-kit";
import { Button } from 'react-bootstrap';
function MD_BTN(props) {
  return (
    <Button variant={props.variant}  type={props.type} onClick={props.method} className="ms-1">
            {props.name}
          </Button>
  )
}

export default MD_BTN