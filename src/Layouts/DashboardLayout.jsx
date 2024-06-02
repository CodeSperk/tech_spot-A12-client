import { Outlet } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useState } from "react";
import "../SharedComponents/Navbar/navbar.css";
import { MdOutlineAppShortcut } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FaHome, FaListAlt } from "react-icons/fa";
import { TbLogout2 } from "react-icons/tb";
import { RiMenuUnfold3Fill, RiMenuUnfold4Fill } from "react-icons/ri";
import useAuth from "../Hooks/useAuth";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(true);
  const {user} = useAuth();
  console.log(user);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      {/* Sidebar */}
      <div>
        <aside
          className={`transition-all duration-300 ${
            isOpen ? "w-[270px]" : "w-0"
          } bg-[#fdf9ff] fixed top-0 left-0 z-10 h-full border-r border-[var(--clr-light-gray)] p-8 flex flex-col justify-between items-center`}
        >
          {/* website name */}
          <Link to="/">
            <div className="flex items-center justify-between gap-2 cursor-pointer">
              <FaHome className="text-3xl text-[var(--clr-secondary)] hover:text-[var(--clr-focussed)]" />
              <h4 className={`${!isOpen && "hidden"}`}>
                <span className="text-[var(--clr-focussed)]">Tech</span>Spot
              </h4>
            </div>
          </Link>

          <div className="flex-1 flex justify-center items-center">
            <ul className="nav-list space-y-6 font-semibold">
              <NavLink
                to="/dashboard"
                className="list flex items-center justify-between gap-2"
              >
                <CgProfile className="text-2xl text-start" />
                <p className={`${!isOpen && "hidden"}`}>My Profile</p>
              </NavLink>

              <NavLink
                to="/dashboard/addProduct"
                className="list flex justify-between items-center gap-2"
              >
                <MdOutlineAppShortcut className="text-2xl" />
                <p className={`${!isOpen && "hidden"}`}>Add Product</p>
              </NavLink>

              <NavLink
                to="/dashboard/myProducts"
                className="list flex justify-between items-center gap-2"
              >
                <FaListAlt className="text-lg" />
                <p className={`${!isOpen && "hidden"}`}>My Products</p>
              </NavLink>
            </ul>
          </div>
          {/* Sidebar end */}
          
            <div className="font-semibold flex  gap-2 items-center text-[var(--clr-secondary)] hover:text-[--clr-focussed] cursor-pointer">
              <TbLogout2 className="text-3xl" />
              <span className={`${isOpen || "hidden"}`}>Logout</span>
            </div>
        </aside>

        <div
          className={`transition-all duration-300 ${
            isOpen ? "left-[300px]" : "left-24"
          } h-[40px] w-[45px] border border-[var(--clr-light-gray)] hover:border-[var(--clr-focussed)] cursor-pointer fixed top-5 rounded-md bg-[var(--clr-white)] flex justify-center items-center hover:text-[var(--clr-focussed)]`}
          onClick={toggleSidebar}
        >
          {isOpen ? (
            <RiMenuUnfold4Fill className="text-2xl" />
          ) : (
            <RiMenuUnfold3Fill className="text-2xl" />
          )}
        </div>
      </div>

      <main className={`${isOpen ? 'ml-[275px]' : 'ml-[70px]'}`}>
        <Outlet></Outlet>
      </main>
    </div>
  );
};

export default DashboardLayout;
