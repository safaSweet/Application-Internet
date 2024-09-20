import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import Cookie from "cookie-universal";
function RequireAuth() {
    const cookie = Cookie();
    const token=cookie.get('token');
   
  return (token)? <Outlet/>:<Navigate to={'/login'} replace={true}/>;
}

export default RequireAuth