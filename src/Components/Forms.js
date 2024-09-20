import React from "react";

import { Form } from "react-bootstrap";

function Forms({  handlerChange, type, name, placeholder }) {
  return (
    <>
      <Form.Control
        className="mb-3"
        placeholder={placeholder}
        type={type}
        size="lg"
        onChange={handlerChange}
        name={name}
        required
      />
    </>
  );
}

export default Forms;
