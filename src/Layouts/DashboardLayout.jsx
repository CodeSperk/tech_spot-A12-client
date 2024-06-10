import { Outlet, useNavigate } from "react-router-dom";
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
import useUserRole from "../Hooks/useUserRole";
import Swal from "sweetalert2";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(true);
  const {user, logOutUser} = useAuth();
  const [userRole, isUserLoading] = useUserRole();
  const navigate = useNavigate();


  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Admin Links
  const adminLinks = <>
                  <NavLink
                to="/adminDashboard"
                className="list flex items-center justify-between gap-2"
              >
                <CgProfile className="text-2xl text-start" />
                <p className={`${!isOpen && "hidden"}`}>Statistics</p>
              </NavLink>

              <NavLink
                to="/adminDashboard/manageUsers"
                className="list flex justify-between items-center gap-2"
              >
                <MdOutlineAppShortcut className="text-2xl" />
                <p className={`${!isOpen && "hidden"}`}>Manage Users</p>
              </NavLink>

              <NavLink
                to="/adminDashboard/manageCoupons"
                className="list flex justify-between items-center gap-2"
              >
                <FaListAlt className="text-lg" />
                <p className={`${!isOpen && "hidden"}`}>ManageCoupons</p>
              </NavLink>
  </>

  // Moderator Links
  const moderatorLinks = <>
                  <NavLink
                to="/moderatorDashboard"
                className="list flex items-center justify-between gap-2"
              >
                <CgProfile className="text-2xl text-start" />
                <p className={`${!isOpen && "hidden"}`}>Product Review</p>
              </NavLink>

              <NavLink
                to="/moderatorDashboard/reported"
                className="list flex justify-between items-center gap-2"
              >
                <MdOutlineAppShortcut className="text-2xl" />
                <p className={`${!isOpen && "hidden"}`}>Product Reported</p>
              </NavLink>
  </>

  // User Links
  const userLinks = <>
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
  </>
if (user && isUserLoading) return <div>Loading...</div>;
  
const handleLogout = () => {
  logOutUser()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Logout Success",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/")
      })
      .catch((error) => {
        console.log(error);
      });
  }

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
              { 
               userRole === "admin" ? adminLinks : userRole === "moderator" ? moderatorLinks : userLinks 
              }
            </ul>
          </div>
          {/* Sidebar end */}
          
            <div className="font-semibold flex  gap-2 items-center text-[var(--clr-secondary)] hover:text-[--clr-focussed] cursor-pointer" onClick={handleLogout}>
              <TbLogout2 className="text-3xl" />
              <span className={`${isOpen || "hidden"}`}>Logout</span>
            </div>
        </aside>

              {/* sidebar toggle button */}
        <div
          className={`transition-all duration-300 ${
            isOpen ? "left-[280px]" : "left-20"
          } h-[40px] w-[45px] border border-[var(--clr-light-gray)] hover:border-[var(--clr-focussed)] cursor-pointer fixed top-5 rounded-md bg-[var(--clr-white)] flex justify-center items-center hover:text-[var(--clr-focussed)] z-20`}
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
        {/* dashboard top */}
        <div className="bg-[#fdf9ff] border-b border-[var(--clr-light-gray)] py-6 px-10 text-center pl-16">
          <h3>Welcome to dashboard</h3>
        </div>
        <Outlet></Outlet>
      </main>
    </div>
  );
};

export default DashboardLayout;
