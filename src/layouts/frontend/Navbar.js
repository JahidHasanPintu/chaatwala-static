import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { json, Link, NavLink } from "react-router-dom";
import { ShoppingCart } from "react-feather";
// import chaatwalanyc_menu from '../../assets/frontend/documents/ChaatWalaMenu.pdf';

const Navbar = (props) => {
  const getData = useSelector((state) => state.carts);
  const [data, setData] = useState(
    localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []
  );

  const [loginToken, setloginToken] =useState(localStorage.getItem("user-token") ? JSON.stringify(localStorage.getItem("user-token")) :  null)

  useEffect(() => {
    if (getData?.cartItem) {
      let index = data
        .map(function (val) {
          return val.id;
        })
        .indexOf(getData.cartItem.id);
      if (index !== -1) {
        myFunction(index);
      } else {
        getData.cartItem.incPrice = getData.cartItem.price;
        setData([...data, getData.cartItem]);
        let dta = [...data, getData.cartItem];
        localStorage.setItem("cart", JSON.stringify(dta));
      }
    }
  }, [getData]);

  const myFunction = (index, status = null) => {
    let item = JSON.parse(localStorage.getItem("cart"));
    item[index].quantity = item[index].quantity + 1;
    item[index].incPrice = parseInt(item[index].price) * item[index].quantity;
    setData(item);
    localStorage.setItem("cart", JSON.stringify(item));
  };
  return (
    <nav className="navbar navbar-dark navbar-expand-lg bg-dark shadow sticky-top">
      <div className="container">
        <span className="navbar-brand">
          <strong className="text-light">
            <a
              href="https://order.tbdine.com/pickup/45349"
              // to='/food'
              target="_blank"
              style={{ fontSize: "25px", background: "#C64A24" }}
              className="btn btn-outline-light fw-bold"
            >
              Order Now
            </a>
          </strong>
          {/* {
            props.data_update ?? data.length?
            <Link to="/order" className="ms-3 text-light position-relative">
            <ShoppingCart />
            <span className="position-absolute mt-2 top-0 start-100 translate-middle badge rounded-pill bg-danger">
              <small className="total-items-count">
                {props.data_update ?? data.length}
              </small>
            </span>
          </Link>
            : <Link to=" " className="ms-3 text-light position-relative">
            <ShoppingCart />
            <span className="position-absolute mt-2 top-0 start-100 translate-middle badge rounded-pill bg-danger">
              <small className="total-items-count">
                {props.data_update ?? data.length}
              </small>
            </span>
          </Link>
          } */}
          
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
            {/* <li className="nav-item">
                            <a target='_blank' href={chaatwalanyc_menu} className="nav-link text-light" aria-current="page">Chaat Wala Menu</a>
                        </li> */}
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
            {/* {loginToken && (
              <li className="nav-item">
              <NavLink className="nav-link text-light" to="/profile">
                Profile
              </NavLink>
            </li>
            )} */}
          </ul>
          {/* <form className="d-md-flex" role="search">
            {!loginToken ? (
              <Link className="btn btn-outline-light fw-bold" to="/login">
                Sign In
              </Link>
            ) : (
              <Link className="btn btn-outline-light fw-bold" to="/logout">
                Sign Out
              </Link>
            )}
          </form> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
