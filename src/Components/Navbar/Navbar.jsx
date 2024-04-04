import React, { useContext, useRef, useState } from "react";
import { Button } from "antd";
import "./Navbar.css";
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import nav_dropdown from "../Assets/nav_dropdown.png";
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";

const Navbar = () => {
  const [menu, setMenu] = useState("main");
  const { getTotalCartItems } = useContext(ShopContext);
  const menuRef = useRef();

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle("nav-menu-visible");
    e.target.classList.toggle("open");
  };

  return (
    <div className="navbar">
      <Link
        to="/"
        onClick={() => {
          setMenu("main");
        }}
        className="nav-logo"
      >
        <img src={logo} alt="" />
        <p>ClimbCraft</p>
      </Link>
      <img
        onClick={dropdown_toggle}
        className="nav-dropdown"
        src={nav_dropdown}
        alt=""
      />
      <ul ref={menuRef} className="nav-menu">
        <li
          onClick={() => {
            setMenu("main");
          }}
        >
          <Link to="/">Main</Link>
          {menu === "main" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("shop");
          }}
        >
          <Link to="/shop">Shop</Link>
          {menu === "shop" ? <hr /> : <></>}
        </li>
      </ul>
      <div className="nav-login-cart">
        <Link to="/login">
          <Button type="primary">Login</Button>
        </Link>
        <Link to="/cart">
          <img src={cart_icon} alt="" />
        </Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  );
};

export default Navbar;
