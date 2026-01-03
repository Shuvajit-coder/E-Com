import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { ChevronDown, MapPin, ShoppingCart, X,  } from "lucide-react";
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { HiMenuAlt1, HiMenuAlt3 } from "react-icons/hi";
import RsponsiveMenu from "./RsponsiveMenu";

const Navbar = ({location, getLocation, openDropdown,setOpenDropdown}) => {
  
 const {cartItem} = useCart()
 const[openNav, setOpenNav]= useState(false)

  const toggleDropdown = () =>{
    setOpenDropdown(!openDropdown)
  }
  return (
    <div className="bg-white shadow-2xl py-2 px-4 md:px-0">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo section */}
        <div className="flex items-center gap-7">
          <Link to={"/"}>
            <h1 className="font-bold text-3xl">
              <span className="text-red-600 font-serif">E</span>.Com
            </h1>
          </Link>
          <div className="md:flex gap-1 cursor-pointer text-gray-600 items-center hidden">
            <MapPin className="text-red-500" />
            <span className="font-semibold ">
              {location ? <div className="-space-y-2">
                <p>{location.county}</p>
                <p>{location.state}</p>
              </div> : "Add address"}
            </span>
            <ChevronDown onClick={toggleDropdown} />
          </div>
          {
            openDropdown ? <div className="w-[250px] h-max shadow-2xl z-50 bg-white fixed top-16 left-60 border-2 p-5 border-gray-100 rounded-md">
              <h1 className="font-semibold mb-4 text-xl flex justify-between">Change Location <span onClick={toggleDropdown}><X/></span></h1>
              <button onClick={getLocation} className="bg-red-500 text-white px-3 py-1 rounded-md cursor-pointer hover:bg-red-400">Detect my location</button>
            </div>:null
          }
        </div>
        {/* Menu Section */}
        <nav className="flex gap-7 items-center">
          <ul className="md:flex font-semibold text-xl items-center gap-7 hidden">
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                `${
                  isActive
                    ? "border-b-3 transition-all border-red-500"
                    : "text-black"
                } cursor-pointer`
              }
            >
              <li>Home</li>
            </NavLink>
            <NavLink
              to={"/products"}
              className={({ isActive }) =>
                `${
                  isActive
                    ? "border-b-3 transition-all border-red-500"
                    : "text-black"
                } cursor-pointer`
              }
            >
              <li>Products</li>
            </NavLink>
            <NavLink
              to={"/about"}
              className={({ isActive }) =>
                `${
                  isActive
                    ? "border-b-3 transition-all border-red-500"
                    : "text-black"
                } cursor-pointer`
              }
            >
              <li>About</li>
            </NavLink>
            <NavLink
              to={"/contact"}
              className={({ isActive }) =>
                `${
                  isActive
                    ? "border-b-3 transition-all border-red-500"
                    : "text-black"
                } cursor-pointer`
              }
            >
              <li>Contact</li>
            </NavLink>
          </ul>
          <Link to={"/cart"} className="relative">
            <ShoppingCart className="w-7 h-7" />
            <span className="absolute -top-3 -right-3 text-white bg-red-500 px-2 rounded-full">
              {cartItem.length}
            </span>
          </Link>
          <div className="hidden md:block">
            <SignedOut>
              <SignInButton className='bg-red-500 text-white px-3 py-1 rounded-md cursor-pointer' />
            </SignedOut>
            <SignedIn>
              <UserButton/>
            </SignedIn>
          </div>
          {
              openNav ? <HiMenuAlt3 onClick={()=>setOpenNav(false)} className="h-7 w-7 md:hidden"/> : <HiMenuAlt1
              onClick={()=>setOpenNav(true)}
              className="h-7 w-7 md:hidden"/>
          }
        </nav>
      </div>
      <RsponsiveMenu openNav={openNav} setOpenNav={setOpenNav}/>
    </div>
  );
};

export default Navbar;
