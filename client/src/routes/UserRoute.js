import React from 'react'
import { useSelector } from 'react-redux'
import Notfound404 from "../components/pages/Notfound404";


const UserRoute = ({ children }) => {
    
  const { user } = useSelector((state) => ({ ...state }));

  console.log("user route", user)
    

  const text = "Please Login";


  return user && user.user.token ? children : <Notfound404 text={text} />;
}

export default UserRoute