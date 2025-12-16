import React from "react";
import logo from "../assets/icons/logo.svg";
import '../App.css'
import '../index.css'
import HamburgerNav from "./hamburger.jsx";

function Header() {
  return (
    <header>
      <div className="logo">
        <div className="logo-image">
          <img src={logo} alt="Logo" />
        </div>
        <h4>Czech Myst</h4>
      </div>
      <HamburgerNav />
    </header>
  );
}

export default Header;
