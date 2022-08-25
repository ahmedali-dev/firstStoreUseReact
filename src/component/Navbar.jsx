import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./css/nav.css";

const Navbar = () => {
  const { cart } = useSelector((state) => state.product);
  const navRef = useRef();

  useEffect(() => {
    window.addEventListener("scroll", (e) => {
      if (window.scrollY > 150) {
        navRef.current.classList.add("activenav");
      } else if (window.scrollY < 150) {
        navRef.current.classList.remove("activenav");
      }
    });
  }, [navRef]);
  return (
    <div className="navbar" ref={navRef}>
      {/*
       *logo
       *navgation
       *navToggle
       */}

      <div className="logo">
        <p>dv</p>
      </div>

      <div className="nav">
        <div className="nav-item">
          <Link to="/product" className="nav-item-link">
            Product
          </Link>
        </div>

        <div className="nav-item">
          <Link to="/additem" className="nav-item-link">
            AddItem
          </Link>
        </div>

        <div className="nav-item">
          <Link to="/cart" className="nav-item-link">
            Cart{" "}
            <span className="cart-spanNum">
              {cart.length > 0 ? `${cart.length}` : `0`}
            </span>
          </Link>
        </div>
      </div>

      <div className="navToggle">
        <span className="nav-toggle"></span>
        <span className="nav-toggle"></span>
        <span className="nav-toggle"></span>
      </div>
    </div>
  );
};

export default Navbar;
