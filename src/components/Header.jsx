import React from "react";
import { Link } from "react-router";
import logo from "../assets/icons/logo.svg";
import '../App.css'
import '../index.css'
import HamburgerNav from "./hamburger.jsx";

function Header() {
  return (
    <header>
      <Link to="/" className="logo">
        <div className="logo-image">
          <img src={logo} alt="Logo" />
        </div>
        <h4>Czech Myst</h4>
      </Link>
      <HamburgerNav />
    </header>
  );
}

export default Header;
