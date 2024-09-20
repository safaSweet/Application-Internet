import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Cookie from "cookie-universal";

const cookies = Cookie();
const token = cookies.get("token");

export default function Get_Repo() {
    const [data, setData] = useState([]);
    useEffect(()=>{
        axios
        .get(`http://127.0.0.1:8000/api/repo/get-repository`, {
          headers: { Authorization: "Bearer " + token },
        })
        .then((e) => setData(e.data.data));
    },[])
    const getData = data.map((data, index) => (
        <option value={data.id} key={index}>
          {data.name}
        </option>
      ));
      return <>{getData}</>;
}
