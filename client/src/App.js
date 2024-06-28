import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Layout
import HeaderBar from "./layout/HeaderBar";
import { CssBaseline } from "@mui/material";
import SideBar from "./layout/SideBar";

import FormProduct from "./components/FormProduct";
import FormEditProduct from "./components/FormEditProduct";

// pages
import Register from "./components/pages/auth/Register";
import Login from "./components/pages/auth/Login";


// admin
import HomePageAdmin from "./components/pages/admin/HomePageAdmin";

// user
import HomePageUser from "./components/pages/user/HomePageUser";

// route
import AdminRoute from "./routes/AdminRoute";
import UserRoute from "./routes/UserRoute";

//function
import { currentUser } from "./functions/auth";
import { useDispatch } from "react-redux";
import { login } from "./store/userSlice";

import Notfound404 from "./components/pages/Notfound404";
import ResponsiveAppBar from "./layout/ResponsiveAppBar";



function App() {

  const dispatch = useDispatch()

  const idToken = localStorage.getItem("token")
  console.log("token", idToken)
  currentUser(idToken)
    .then(res => {
      console.log(res)
      dispatch(login({
        name: res.data.name,
        role: res.data.role,
        token: idToken,
      }))
    }).catch((err) => {
    console.log(err)
  })

  return (
    <BrowserRouter>
      <>
        <CssBaseline />

        {/* publish */}
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <>
            <ResponsiveAppBar />
            <h1>HOME </h1>
            </>

          } />
          
          <Route
            path="*"
            element={
              <Notfound404 text="The page you’re looking for doesn’t exist." />
            }
          />

          {/* user */}
          <Route
            path="/user/index"
            element={
              <UserRoute>
                <HomePageUser />
              </UserRoute>
            }
          />

          {/* admin */}
          <Route
            path="/admin/index"
            element={
              <AdminRoute>
                <HomePageAdmin />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/viewtable"
            element={
              <AdminRoute>
                <FormProduct />
              </AdminRoute>
            }
          />

          <Route
            path="/edit/:id"
            element={
              <AdminRoute>
                <FormEditProduct />
              </AdminRoute>
            }
          />
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;
