import { Outlet } from "react-router-dom";
import Navbar from "../SharedComponents/Navbar/Navbar";

const RootLayout = () => {
  return (
    <div>
      <div className="mx-auto max-w-[1440px] px-4 md:px-8 lg:px-10 2xl:px-14">
        <Navbar></Navbar>
      </div>
      
      <div>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default RootLayout;
