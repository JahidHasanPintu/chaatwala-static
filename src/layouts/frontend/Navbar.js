import React from "react";
import { NavLink } from "react-router-dom";
const Navbar = (props) => {
  return (
    <nav className="navbar navbar-dark navbar-expand-lg bg-dark shadow sticky-top">
      <div className="container">
        <span className="navbar-brand">
          <strong className="text-light">
            <a
              href="https://order.tbdine.com/pickup/45349"
              target="_blank"
              rel="noreferrer"
              style={{ fontSize: "25px", background: "#C64A24" }}
              className="btn btn-outline-light fw-bold"
            >
              Order Now
            </a>
          </strong>
        </span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                className="nav-link text-light"
                aria-current="page"
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-light" to="/menu">
                Category
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-light" to="/food">
                Item
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-light" to="/blog">
                Blog
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-light" to="/about">
                About Us
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-light" to="/contact">
                Contact Us
              </NavLink>
            </li>
          </ul>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
