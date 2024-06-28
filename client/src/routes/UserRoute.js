import React from 'react'
import { useSelector } from 'react-redux'
import Notfound404 from "../components/pages/Notfound404";
import ResponsiveAppBar from '../layout/ResponsiveAppBar';


const UserRoute = ({ children }) => {  
  const { user } = useSelector((state) => ({ ...state }));
  console.log("user route", user)


  return user && user.user.token ? (
    <>
      <ResponsiveAppBar />
      {children}
    </>
  ) : (
    <Notfound404 text="Please Login" />
  );
}

export default UserRoute