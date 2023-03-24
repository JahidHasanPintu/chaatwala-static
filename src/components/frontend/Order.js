import React, { Fragment, useEffect, useState } from "react";
import { BottomFix } from "./BottomFix";
import { Footer } from "../../layouts/frontend/Footer";
import Navbar from "../../layouts/frontend/Navbar";
import { TopNav } from "../../layouts/frontend/TopNav";
import { OrderItem } from "./card/OrderItem";
import {
  PlusCircle,
  MinusCircle,
  Trash2,
  Feather,
  User,
  Info,
  Edit,
} from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { cartData, logincheck } from "../../Helpers/helper";
import { postApi } from "../../api/apiCall";
import { Login } from "./Login";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CartUpdate } from "../../redux/action/action";

export const Order = (props) => {
  const getData = useSelector((state) => state.cartData);
  const dispatch = useDispatch();
  const [data, setData] = useState(
    localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []
  );
  const [userData, setUserData] = useState([]);
  const [LoginToken, setLoginToken] = useState(
    localStorage.getItem("user-token")
      ? JSON.parse(localStorage.getItem("user-token"))
      : []
  );
  const [total, setTotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [delCharge, setDelCharge] = useState(0);
  const [loginToggle, setLoginToggle] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const nav = useNavigate();
  const [formValue, setFormValue] = useState();
  const [longitude, setLongitude] = useState();
  const [latitude, setLatitude] = useState();

  const Increment = async (index) => {
    myFunction(index);
  };
  const Decrement = async (index) => {
    myFunction(index, "delete");
  };

  const navite =useNavigate();
  const del = (id) => {
    const item = data.filter((val, index) => {
      return index !== id;
    });
    dispatch(CartUpdate(item));
    setData(item);

    if (!item.length) {
      localStorage.setItem("cart", []);
      navite(`/`);
    }
  };

  const myFunction = async (index, status = null) => {
    if (status == "delete") {
      let item = cartData();
      if (item[index].quantity > 1) {
        let qty = item[index].quantity;
        item[index].quantity = qty - 1;
        item[index].incPrice =
          parseInt(item[index].incPrice) - parseInt(item[index].price);
        dispatch(CartUpdate(item));
        setData(item);
      }
    } else {
      let item = cartData();
      let qty = item[index].quantity;
      item[index].quantity = parseInt(qty) + 1;
      item[index].incPrice = parseInt(item[index].price) * item[index].quantity;
      dispatch(CartUpdate(item));
      setData(item);
    }
  };

  const proceedOrder = async (item, status = null) => {
    let token = logincheck();
    if (!status) {
      AuthCheck(token);
    }
    if (status === "true") {
      setIsAuth(true);
      createOrderData("order/create/guest");
    }
    if (status === "false") {
      nav("/login");
    }
  };

  const AuthCheck = async (logincheck) => {
    const url = "check-auth-token";
    const response = await postApi(url, {}, logincheck);
    if (response) {
      proceedOrder("", "true");
    } else {
      proceedOrder("", "false");
    }
  };

  const createOrderData = async (endpoint) => {
    const items = localStorage.getItem("user-token")
      ? JSON.parse(localStorage.getItem("cart"))
      : null;
      let orderType ="store_pickup";
      let contactNumb = "N/A"
      if(shpingOption){
        orderType = "deliver_to";
        contactNumb=document.getElementById("phoneNumber").value;
      }

      


    const data = { 
      items: items,
      order_type: orderType,
      phone: contactNumb

     };
    console.log(data);
    const response = await postApi(endpoint, data, LoginToken);
    if (response) {
      if (response.code === 200) {
        localStorage.setItem("cart", []);
        setData([]);
        nav("/profile");
        toast.success(response.message[0], {
          position: "top-right",
        });
      } else {
        toast.error(response.message[0], {
          position: "top-right",
        });
      }
    }
  };

  const shippingAdressModal = (user_id) => {
    let target = document.getElementById("user_id");
    target.value = user_id;
  };
  const InputValue = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const data = { ...formValue, [name]: value };
    setFormValue(data);
  };
  const handleSubmit =(e)=>{
    e.preventDefault()
    updateShippingAddress();
  }
  const [shpingOption,setShipingOption]=useState(false);
  const updateShippingAddress = async () => {
    let fd=new FormData(document.getElementById("shipping_address"));
    
    
    const response = await postApi(
      "user/update-shipping-address",
       fd ,
      LoginToken
    );
    if (response) {
      if (response.code === 200) {
        toast.success(response.message[0], {
          position: "top-right",
        });
        getAuthUser()
      } else {
        toast.error(response.message[0], {
          position: "top-right",
        });
      }
    }
  };

  const getAuthUser = async () => {
    const url = "user/guest-user-info";
    const response = await postApi(url, {}, LoginToken);
    if (response) {
      setUserData([response?.data]);
    }
  };

  // testing address

  useEffect(() => {

    getAuthUser();
    let price = 0;
    data.map((val, index) => {
      price = parseInt(val.incPrice) + price;
    });
    setTotal(price);
    // Tax and Delivery charge is hard coded ,,,set according to server 
    setTax(8.875);
    setDelCharge(0);
  }, [getData, loginToggle]);

  const getLocation = ()=>{
    if (!"geolocation" in navigator) {
      console.log("Geolocation is not Available");
    }
    navigator.geolocation.getCurrentPosition(function(position) {
      // console.log("Latitude is :", position.coords.latitude);
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
      // console.log("Longitude is :", position.coords.longitude);
    });
  }

  useEffect(() => {
    getLocation();
  });

  return (
    <Fragment>
      <div style={{ backgroundColor: "#eee" }}>
        <TopNav />
        <Navbar data_update={data.length} />
        <div className="mt-5">
          <div className="container">
            <div className="row">
              <div className="col text-start">
                <h1 className="fw-bold mb-0 color-1 ms-md-5 mt-1">
                  Proceed to order
                </h1>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="h-100">
          <div className="container h-100 py-3">
            <div className="row">
              <div className="col-md-8">
                <div className="row d-flex justify-content-center h-100">
                  <div className="col">
                    {data.length
                      ? data.map((item, index) => (
                          <Fragment key={index}>
                            <div className="card rounded-3 mb-2 ">
                              <div className="card-body p-2">
                                <div className="row d-flex md-justify-content-between justify-content-center align-items-center">
                                  <div className="col-md-2 col-lg-2 col-xl-2">
                                    <img
                                      src={item?.image}
                                      className="img-rounded"
                                      alt="item"
                                    />
                                  </div>
                                  <div className="col-md-3 col-lg-3 col-xl-3">
                                    <p className="lead fw-normal mb-2">
                                      {item?.name}
                                    </p>
                                  </div>
                                  <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                                    <button
                                      className="btn btn-sm btn-outline-primary"
                                      onClick={() => Increment(index)}
                                    >
                                      <PlusCircle height={15} />
                                    </button>

                                    <button className="btn btn-sm btn-outline-primary">
                                      {item?.quantity}
                                    </button>

                                    <button
                                      className="btn btn-sm btn-outline-primary"
                                      onClick={() => Decrement(index)}
                                    >
                                      <MinusCircle height={15} />
                                    </button>
                                  </div>
                                  <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                    <h5 className="mb-0">${item?.incPrice}</h5>
                                  </div>
                                  <div className="col-md-1 col-lg-1 col-xl-1 md-text-end">
                                    <a
                                      className="text-danger"
                                      onClick={() => del(index)}
                                    >
                                      <Trash2 />
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Fragment>
                        ))
                      : null}
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="row d-flex h-100">
                  <div className="col">
                    <div className="card rounded-3 mb-4">
                      <div className="card-body p-4">
                        <div className="row d-flex justify-content-between align-items-center mb-4">
                          <h5 className="text-start">Order Total</h5>
                          <hr />
                          <div className="col text-start">
                            <p className="fw-bold">Sub Total</p>
                            <p className="fw-bold">Delivery Charge</p>
                            <p className="fw-bold">Sales Tax ({tax}%) </p>
                          </div>
                          <div className="col text-end">
                            <p className="fw-bold">${total.toFixed(2)}</p>
                            <p className="fw-bold">${delCharge.toFixed(2)}</p>
                            <p className="fw-bold">${((total/100)*tax).toFixed(2)}</p>
                            
                          </div>
                          <hr/>
                          <div className="col text-start">
                            <p className="fw-bold">Total</p>
                          </div>
                          <div className="col text-end">
                            
                            <p className="fw-bold">${(total+ delCharge +((total/100)*tax )).toFixed(2)}</p>
                          </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                          <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" defaultChecked name="order_type" id="store_pickup" value={"store_pickup"} onClick={()=>setShipingOption(false)} />
                            <label className="form-check-label" htmlFor="store_pickup">
                              Store Pickup
                            </label>
                          </div>
                          
                          <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="order_type" id="deliver_to" value={"deliver_to"} onClick={()=>setShipingOption(true)}/>
                            <label className="form-check-label" htmlFor="deliver_to">
                              Deliver To
                            </label>
                          </div>
                       
                        </div>
                       
                        {
                          shpingOption && 
                          <div>
                          {userData?.length
                            ? userData?.map((item, key) => (
                                <Fragment  key={key}>

                                  <h6
                                    style={{ textAlign: "left" }}
                                    className="text-primary"
                                  >
                                    {" "}
                                    <Info /> Deliver within 1 miles
                                  </h6>
                                  {/* <p className="text-start mt-1">Phone : {item?.phone} </p> */}
                                  <div className="mb-3 text-start">
                                  <label htmlFor="phoneNumber">Contact Number : *</label>
                                  <input
                                  type={'text'}
                                  name="phoneNumber"
                                  id="phoneNumber"
                                  defaultValue={item?.phone}
                                  className="form-control"
                                  required
    
                                ></input>
                                </div>
                                  <p className="text-start mt-1">Address Line 1 : {item?.shipping_address?.address_line_1} </p>
                                  <p className="text-start mb-3">Address Line 2 : {item?.shipping_address?.address_line_2} </p>
                                  
                                  <h6
                                    style={{ textAlign: "left" }}
                                    className="mt-1 mb-3 text-primary"
                                    
                                    data-bs-toggle="modal" data-bs-target="#exampleModal"
                                  >
                                    {" "}
                                    <p
                                      onClick={() =>
                                        shippingAdressModal(item.id)
                                      }
                                      className="pointer"
                                    >
                                      <Edit /> Change adddress{" "}
                                    </p>
                                  </h6>
                                </Fragment >
                              ))
                            : null}
                        </div>
                        }
                        <div className="d-grid">
                          <button
                            className="btn btn-secondary bg-color-1"
                            onClick={proceedOrder}
                            disabled={data.length ? false : true}
                          >
                            Proceed to Checkout
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              

              <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">Update Shipping Address</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <form
                          id="shipping_address"
                          onChange={InputValue}
                          onSubmit={handleSubmit}
                        >
                    <div className="modal-body">
                    <div className="card bg-light">
                      <div className="card-body row text-dark">
                      {userData?.length
                            ? userData?.map((item, key) => (
                                <Fragment key={key}>
                                  {/* <div className="mb-3 text-start">
                                  <label htmlFor="phone">Phone : *</label>
                                  <input
                                  type={'text'}
                                  name="phone"
                                  id="phone"
                                  defaultValue={item?.phone}
                                  className="form-control"
    
                                ></input>
                                </div> */}
                                  <div className="mb-3 text-start">
                                  <input
                                  type={'text'}
                                  name="user_id"
                                  id="user_id"
                                  value={item?.id}
                                  className="form-control d-none"
                                  readOnly
                                ></input>
                                    <label htmlFor="address1">Address Line 1: *</label>
                                    <textarea
                                      name="address_line_1"
                                      id="address_line_1"
                                      defaultValue={item?.shipping_address?.address_line_1}
                                      placeholder="Unit No, Apt, Street Address"
                                      className="form-control"
                                    ></textarea>
                              
                                </div>
                            <div className="mb-3 text-start">
                              <label htmlFor="address2">Address Line 2: *</label>
                              <textarea
                                name="address_line_2"
                                id="address_line_2"
                                defaultValue={item?.shipping_address?.address_line_2}
                                placeholder="City, State, ZIP Code"
                                className="form-control"
                              ></textarea>
                            </div>
                            <div className="mb-3 text-start">
                            <label htmlFor="country">Country: *</label>
                            <input
                                  type={'text'}
                                  name="country"
                                  id="country"
                                  value={item?.shipping_address?.country}
                                  className="form-control"
                                  readOnly
                                ></input>
                            </div>


                                </Fragment>
                              ))
                            : null}
                          
                            
                        </div>
                      </div>
                    </div>


                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      <input
                              className="btn bg-color-1 text-light"
                              type="submit"
                              value="Save Changes"
                            />
                    </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
        <BottomFix />
      </div>
    </Fragment>
  );
};
