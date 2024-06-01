import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../SharedComponents/Navbar/Navbar";

const RootLayout = () => {
  const location = useLocation();
  return (
    <div>
      {(location.pathname !== "/login" && location.pathname !=="/register") && 
      <div className="mx-auto max-w-[1440px] px-4 md:px-8 lg:px-10 2xl:px-14">
       <Navbar></Navbar>
      </div>  
      }      
      <div>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default RootLayout;
