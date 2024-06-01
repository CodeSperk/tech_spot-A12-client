import {
  Collapse,
  IconButton,
  ListItem,
  List,
  Menu,
  MenuHandler,
  MenuList,
} from "@material-tailwind/react";

import "./navbar.css";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "/logo.png";
import avatar from "../../assets/icons&logo/avatar.png";
import { IoMdClose, IoMdMenu } from "react-icons/io";

const Navbar = () => {
  const [openNav, setOpenNav] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = false;

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const menuList = (
    <>
      <List className="flex gap-2 lg:gap-3 lg:flex-row nav-list my-8 lg:my-0">
        <NavLink to="/" className="item">
          <ListItem className="list duration-500">Home</ListItem>
        </NavLink>
        <NavLink to="/products" className="item">
          <ListItem className="list duration-500">Products</ListItem>
        </NavLink>
      </List>
    </>
  );

  return (
    <nav className="py-6 md:py-8 lg:py-10">
      <div className="flex items-center justify-between">
        {/* Logo and website name */}
        <div className="cursor-pointer flex items-center gap-2">
          <img src={logo} alt="" className="w-10" />
          <h3>
            <span className="text-[var(--clr-focussed)]">Tech</span>Spot
          </h3>
        </div>

      {/* Centered Menu for large devices */}
        <div className="hidden lg:block">{menuList}</div>
      
      {/* Navbar end */}
        <div className="flex gap-2 items-center">
          {/* Icon to open collapsed menu */}
          <IconButton
            variant="text"
            color="blue-gray"
            className="lg:hidden"
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <IoMdClose className="h-6 w-6" strokeWidth={2} />
            ) : (
              <IoMdMenu className="h-6 w-6" strokeWidth={2} />
            )}
          </IconButton>

          {/* Conditional login, register and user profile */}
          {user ? (
            <Menu
              open={isMenuOpen}
              handler={setIsMenuOpen}
              placement="bottom-end"
            >
              <MenuHandler>
                <div className="w-12 rounded-full border-4 border-[var(--clr-white)] bg-[var(--bg-secondary)] cursor-pointer">
                  <img src={avatar} alt="User's Profile Picture" />
                </div>
              </MenuHandler>
              <MenuList className="p-4 text-[var(--clr-primary)]">
                <p>Mahbubur Rahman</p>
                <li className="my-4 mb-6">Dashboard</li>
                <button className="btn1 w-full">Logout</button>
              </MenuList>
            </Menu>
          ) : (
            <div className="hidden gap-2 lg:flex">
              <Link to="/login">
                <button className="btn1 bg-transparent">Login</button>
              </Link>
              <Link to="/register">
                <button className="btn1 bg-transparent">Register</button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Collapsed Menu for medium and smaller devices*/}
      <Collapse open={openNav}>
        <div className="shadow-3xl border-2 border-t-0 p-4 md:p-8">
          {menuList}
          {!user && (
            <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
              <Link to="/login" className="w-full">
                <button className="btn1 w-full lg:w-fit">Login</button>
              </Link>
              <Link to="/register" className="w-full">
                <button className="btn1 w-full lg:w-fit">Register</button>
              </Link>
            </div>
          )}
        </div>
      </Collapse>

    </nav>
  );
};

export default Navbar;
