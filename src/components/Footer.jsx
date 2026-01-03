import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaPinterest,
  FaTwitterSquare,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand Info */}
        <div>
          <Link to="/">
            <h1 className="text-red-500 text-2xl font-bold">E.com</h1>
          </Link>
          <p className="mt-3 text-sm">
           Everything You Need. One Marketplace.
          </p>
           <p>Electronics • Groceries • Essentials</p>
          <p className="mt-2 text-sm">123 Commerce Street, Market City, NY 10001</p>
          <p className="text-sm">Email: support@E.Com.com</p>
          <p className="text-sm">Phone: (123) 456-7890</p>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-lg font-semibold text-white">
            Customer Service
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li className="hover:text-red-500 cursor-pointer">Contact Us</li>
            <li className="hover:text-red-500 cursor-pointer">
              Shipping & Returns
            </li>
            <li className="hover:text-red-500 cursor-pointer">FAQs</li>
            <li className="hover:text-red-500 cursor-pointer">
              Order Tracking
            </li>
            <li className="hover:text-red-500 cursor-pointer">Size Guide</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-white">Follow Us</h3>
          <div className="flex space-x-4 mt-4 text-2xl">
            <FaFacebook className="hover:text-red-500 cursor-pointer" />
            <FaInstagram className="hover:text-red-500 cursor-pointer" />
            <FaTwitterSquare className="hover:text-red-500 cursor-pointer" />
            <FaPinterest className="hover:text-red-500 cursor-pointer" />
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-white">
            Stay in the Loop
          </h3>
          <p className="mt-3 text-sm">
            Subscribe to get special offers, free giveaways, and more
          </p>
          <form className="mt-4 flex">
            <input
              type="email"
              placeholder="Your email address"
              className="
                w-full px-3 py-2
                rounded-l-md
                bg-gray-800
                text-white
                focus:outline-none
                focus:ring-2
                focus:ring-red-500
              "
            />
            <button
              type="submit"
              className="
                bg-red-600
                px-4
                rounded-r-md
                text-white
                hover:bg-red-700
                transition
              "
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 py-4 text-center text-sm">
        <p>
          &copy; {new Date().getFullYear()}{" "} 
          <span className="mx-1 underline">Shuvajit</span>
          <span className="text-red-500 font-semibold">E.Com</span>. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
