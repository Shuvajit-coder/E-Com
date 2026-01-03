import { UserButton, useUser } from "@clerk/clerk-react";
import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const ResponsiveMenu = ({ openNav, setOpenNav }) => {
  const { user } = useUser();

  return (
    <div
      className={`${
        openNav ? "left-0" : "-left-[100%]"
      } fixed top-0 bottom-0 z-20 flex h-screen w-[75%] flex-col justify-between 
      bg-white px-8 pb-6 pt-16 text-black md:hidden 
      rounded-r-xl shadow-md transition-all`}
    >
      {/* TOP SECTION */}
      <div>
        {/* USER INFO */}
        <div className="flex items-center gap-3">
          {user ? <UserButton size={50} /> : <FaUserCircle size={50} />}
          <div>
            <h1 className="font-semibold">
              Hello, {user?.firstName || "Guest"}
            </h1>
            <p className="text-sm text-slate-500">Premium User</p>
          </div>
        </div>

        {/* NAV LINKS */}
        <nav className="mt-12">
          <ul className="flex flex-col gap-7 text-2xl font-semibold">
            <Link to="/" onClick={() => setOpenNav(false)}>
              <li className="cursor-pointer hover:text-red-500">Home</li>
            </Link>
            <Link to="/products" onClick={() => setOpenNav(false)}>
              <li className="cursor-pointer hover:text-red-500">Products</li>
            </Link>
            <Link to="/about" onClick={() => setOpenNav(false)}>
              <li className="cursor-pointer hover:text-red-500">About</li>
            </Link>
            <Link to="/contact" onClick={() => setOpenNav(false)}>
              <li className="cursor-pointer hover:text-red-500">Contact</li>
            </Link>
          </ul>
        </nav>
      </div>

      {/* BOTTOM CREATOR SECTION */}
      <div className="border-t pt-4 text-center">
        <p className="text-xs text-gray-400">Created by</p>
        <p className="text-sm font-semibold text-gray-700">
          Shuvajit
        </p>
      </div>
    </div>
  );
};

export default ResponsiveMenu;
