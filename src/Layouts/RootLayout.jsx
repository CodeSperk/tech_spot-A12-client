import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../SharedComponents/Navbar/Navbar";
import Footer from "../SharedComponents/Footer/Footer";

const RootLayout = () => {
  const location = useLocation();
  return (
    <div>

      {/* Navbar */}
      {(location.pathname !== "/login" && location.pathname !=="/register") && 
      <div className="mx-auto max-w-[1440px] px-4 md:px-8 lg:px-10 2xl:px-14">
       <Navbar></Navbar>
      </div>  
      }      
      <div>
        <Outlet></Outlet>
      </div>

      {/* Footer */}
      {(location.pathname !== "/login" && location.pathname !=="/register") && 
      <footer className="bg-[var(--clr-primary)] py-10 md:py-12 lg:py-16  text-white mt-16 md:mt-20 lg:mt-28">
       <Footer />
      </footer>  
      }  

    </div>
  );
};

export default RootLayout;
