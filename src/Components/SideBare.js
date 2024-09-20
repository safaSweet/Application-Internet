import React, { useEffect, useState } from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
} from "cdbreact";
import axios from "axios";
import { url, getUserRepo } from "../Pages/endPoint";
import AddUser_to_Repo from "../Pages/Users/AddUser_to_Repo";
import { BsFillPersonFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { AddUser } from "../Pages/Users/SliceUser";

const App = ({ id, token, is_admin }) => {
  const [user, setUser] = useState([]);
  const dispatch=useDispatch();

  useEffect(() => {
    axios
      .post(
        `${url}/${getUserRepo}`,
        { repo_id: id },
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then((e) => setUser(e.data.data));
  }, []);

  return (
    <CDBSidebar
      textColor="#333"
      backgroundColor="#f0f0f0"
      style={{ position: "fixed" }}
    >
      <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>
        Users
      </CDBSidebarHeader>
      <CDBSidebarContent>
        {user &&
          user.map((userInfo, ind) => (
            <>
              <CDBSidebarMenu>
                <div className="  p-2 fw-bold" key={ind}>
                  {userInfo.name}   
                  {/* <span onClick={()=>dispatch(AddUser(id))}><BsFillPersonFill/>-</span> */}
                </div>
              </CDBSidebarMenu>
            </>
          ))}
        {is_admin === 1 ? <AddUser_to_Repo id={id} /> : ""}
      </CDBSidebarContent>
    </CDBSidebar>
  );
};

export default App;
