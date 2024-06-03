import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import DashboardLayout from "../Layouts/DashboardLayout";
import MyProfile from "../Pages/Dashboard/User/MyProfile/MyProfile";
import AddProduct from "../Pages/Dashboard/User/AddProduct/AddProduct";
import MyProduct from "../Pages/Dashboard/User/MyProduct/MyProduct";
import PrivateRout from "./PrivateRout";
import ProductDetails from "../Pages/ProductDetails/ProductDetails";
import Products from "../Pages/Products/Products";

const MainRoutes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products",
        element: <Products />
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path:"/details/:id",
        element:<PrivateRout><ProductDetails /></PrivateRout>
      }
    ],
  },
  {
    path: "/dashboard",
    element: <PrivateRout><DashboardLayout /></PrivateRout>,
    children: [
      {
        path: "/dashboard",
        element: <MyProfile />,
      },
      {
        path: "addProduct",
        element:<AddProduct />
      },
      {
        path: "myProducts",
        element:<MyProduct />
      }
    ],
  },
]);

export default MainRoutes;
