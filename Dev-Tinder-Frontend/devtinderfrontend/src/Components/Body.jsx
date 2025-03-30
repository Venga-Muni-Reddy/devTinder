import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Body = () => {
  return (
    <div className="d-flex flex-column ">
      <Navbar className="fixed-top" />

      {/* Ensure the content takes full height and scrolls properly */}
      <div className="container flex-grow-1 d-flex flex-column overflow-auto mt-5 py-3">
        <Outlet />
      </div>

      
    </div>
  );
};

export default Body;
