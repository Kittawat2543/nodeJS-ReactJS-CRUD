import React from 'react'
import { useSelector } from 'react-redux'
const UserRoute = ({ children }) => {
    
  const { user } = useSelector((state) => ({ ...state }));

  console.log("user route", user)
    


  return user && user.user.token ? children : <h1> No login </h1>
}

export default UserRoute