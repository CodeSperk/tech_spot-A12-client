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
import Statistics from "../Pages/Dashboard/Admin/Statistics/Statistics";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers/ManageUsers";
import ManageCoupons from "../Pages/Dashboard/Admin/ManageCoupons/ManageCoupons";
import ReviewProduct from "../Pages/Dashboard/Moderator/ReviewProduct/ReviewProduct";
import ReportedProducts from "../Pages/Dashboard/Moderator/ReportedProducts/ReportedProducts";
import UpdateProduct from "../Pages/Dashboard/User/Update/UpdateProduct";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";


const MainRoutes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement:<ErrorPage />,
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
  // User Dashboard
  {
    path: "/dashboard",
    element: <PrivateRout><DashboardLayout /></PrivateRout>,
    children: [
      {
        path: "",
        element: <MyProfile />,
      },
      {
        path: "addProduct",
        element:<AddProduct />
      },
      {
        path: "myProducts",
        element:<MyProduct />
      },
      {
        path: "update/:id",
        element:<UpdateProduct />
      }
    ],
  },
  // Admin Dashboard
  {
    path:"/adminDashboard",
    element: <PrivateRout><DashboardLayout /></PrivateRout>,
    children:[
      {
        path:"",
        element:<Statistics />
      },
      {
        path:"manageUsers",
        element:<ManageUsers />
      },
      {
        path:"manageCoupons",
        element:<ManageCoupons />
      }
    ]
  },
  // Moderator Dashboard
  {
    path:"/moderatorDashboard",
    element: <PrivateRout><DashboardLayout /></PrivateRout>,
    children:[
      {
        path:"",
        element:<ReviewProduct />
      },
      {
        path:"reported",
        element:<ReportedProducts />
      }
    ]
  }
]);

export default MainRoutes;
