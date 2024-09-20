import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { url,getReport } from "../endPoint";

import Cookies from "cookie-universal";
// import { GET_REPORT } from "./Service";
// import { useDispatch, useSelector } from "react-redux";
// import { GetReport } from "./Slice_Repo";
import axios from "axios";
import { useSelector } from "react-redux";
function Report() {
  const pathSegments = window.location.pathname.split("/");
  const id = pathSegments.slice(-1)[0];
  // const data = useSelector((state) => state);
  // console.log(data)
const [state,setState]=useState([]);
const cookies = Cookies();
const token = cookies.get("token");
  useEffect(() => {
    // dispatch(GetReport(id));
    axios
.post(
  `${url}/${getReport}`,
  { repo_id: id },
  {
    headers: { Authorization: "Bearer " + token },
  }
)
.then((e) => setState(e.data.data));
  }, []);

  const show = state.map((data, index) => (
    
      <tr key={index}>
        <td>{data.file_name}</td>
        <td>{data.user_name}</td>
        <td>{data.operation}</td>
        <td>{data.time}</td>
        <td>{data.date}</td>
      </tr>
  ));
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>File Name</th>
            <th>User Name</th>
            <th>Operation</th>
            <th>Time</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody >{show}</tbody>
      </Table>
    </>
  );
}

export default Report;
