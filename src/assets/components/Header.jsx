import React from "react";
import logo from "../assets/icons/logo.svg";

function Header() {
  return (
    <header>
      <div className="logo">
        <div className="logo-image">
          <img src={logo} alt="Logo" />
        </div>
        <h4>Czech Myst</h4>
      </div>
      <div className="hamburger-menu"></div>
    </header>
  );
}

export default Header;
