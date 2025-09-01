import React from "react";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center py-4 px-8 shadow-md relative">
      <div className="text-lg font-bold">Her haven </div>

      <div className="flex items-center ml-auto gap-6">
        <ul className="flex gap-6 text-gray-700">
          <li className="hover:text-pink-500 cursor-pointer">Home</li>
          <li className="hover:text-pink-500 cursor-pointer">Services</li>
          <li className="hover:text-pink-500 cursor-pointer">About</li>
          <li className="hover:text-pink-500 cursor-pointer">Contact</li>
        </ul>
        <button className="px-4 py-1 border rounded-lg bg-gray-100 hover:bg-pink-500 hover:text-white transition">
          Log In
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
