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



function App() {
  return (
    <BrowserRouter>
      <>
        <CssBaseline />

        {/* publish */}
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

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
