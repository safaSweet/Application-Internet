import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "cookie-universal";
const cookies = Cookies();
const token = cookies.get("token");
export default function GetUsers() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/get-user`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((e) => setData(e.data.data));
  }, []);

  return (
    <>
      {data.map((data, index) => (
        <option value={data.id} key={index}>
          {data.name}
        </option>
      ))}
    </>
  );
};
