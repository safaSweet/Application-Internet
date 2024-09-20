import React, { useEffect } from "react";
import "../../App.css";
import { useState } from "react";
import axios from "axios";
import Cookies from "cookie-universal";
import AddUser_to_Repo from "./AddUser_to_Repo";
import { useDispatch, useSelector } from "react-redux";
import { GetUser } from "./SliceUser";

function Users() {
  const [user, setUser] = useState([]);
  const cookies = Cookies();
  const token = cookies.get("token");
  const dispatch=useDispatch();
  const {data}=useSelector((state)=>state.User)
  useEffect(() => {
    dispatch(GetUser())
    
  }, []);
  const getUser = user.map((user, index) => (
    <li className="list-group-item pt-0" key={index}>
      <div className="d-flex align-items-center">
        <div className="flex-shrink-0 me-3">
          <img
            src="https://bootdey.com/img/Content/avatar/avatar1.png"
            alt=""
            className="avatar rounded-circle"
          />
        </div>
        <div className="flex-grow-1">
          <h6 className="mb-0">{user.name}</h6>
          <p className="mb-0 text-muted">{user.email}</p>
        </div>
      </div>
    </li>
  ));
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-xl-12 mb-3 mb-lg-5">
            <div className="card">
              <div className="d-flex card-header justify-content-between">
                <h5 className="me-3 mb-0">Top Customers</h5>
                <a href="#!.html">View All</a>
              </div>
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  {getUser}
                 
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddUser_to_Repo />
    </>
  );
}

export default Users;
