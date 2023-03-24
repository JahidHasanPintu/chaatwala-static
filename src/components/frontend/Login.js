import React, { useEffect } from "react";
import { Footer } from "../../layouts/frontend/Footer";
import Navbar from "../../layouts/frontend/Navbar";
import { TopNav } from "../../layouts/frontend/TopNav";
import { BottomFix } from "./BottomFix";
// import logo from '../../assets/frontend/logo/chaatwalanyc-logo.png';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { postApi } from "../../api/apiCall";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import Spinner from "./Spinner/Spinner";
export const Login = (props) => {

  const [loading, setLoading] = useState(false);


  const [register, setRegister] = useState(false);
  const [formValue, setFormValue] = useState({});
  const [data,setData] = useState(null);
  const nav = useNavigate();

  const location = useLocation();

  let from = location.state?.from?.pathname || "/";

  const InputValue = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const data = { ...formValue, [name]: value };
    setFormValue(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register ? insertData("guest_user_register") : insertData("guest-login");
  };

  const insertData = async (endpoint) => {
    setLoading(true);
    const fd = new FormData(document.getElementById("" + endpoint + ""));
    const response = await postApi(endpoint, fd, props.auth_token);
    if (response) {
      if (response.code === 200) {
        if (register) {
          setRegister(false);
          toast.success("Registered Successfully", {
            position: "top-right",
          });
          setLoading(false);
        }
        if (response?.data?.token) {
          localStorage.setItem(
            "user-token",
            JSON.stringify(response?.data?.token)
          );
          AuthCheck(response?.data?.token);
          setLoading(false);
        }
      } else {
        toast.error(response.message[0], {
          position: "top-right",
        });
      }
    }
  };
  const getStatesData = async () => {
    
  };
  const [statesData, setStatesData] = useState();
  useEffect(() => {
    setLoading(true);
    fetch(`Data/usStates.json`)
     .then((response) => response.json())
     .then((actualData) => setStatesData(actualData))
     
     .catch((err) => {
      console.log(err.message);
      
     });
     setLoading(false);
   }, []);

  const AuthCheck = async (logincheck) => {
    const url = "check-auth-token";
    setLoading(true);
    const response = await postApi(url, {}, logincheck);
    if (response) {
      // createOrderData("order/create/guest", logincheck);
      nav(from, { replace: true });
      toast.success("Login Successfully", {
        position: "top-right",
      });
      setLoading(false);
    } else {
      toast.error("Please provide valid login credentials", {
        position: "top-right",
      });
    }
  };


  useEffect (()=>{

  },[data])

  return (
    <div>
      <TopNav />
      <Navbar />
      <>
            {
            loading ?<Spinner/>  :<>
            {!register ? (
        <div className="container text-start my-5">
          <div className="row">
            <div className="col-md-4 m-auto">
              <form id="guest-login" onChange={InputValue} onSubmit={handleSubmit}>
                <div className="card bg-dark">
                  <div className="card-body">
                    <div className="mb-3 text-decoration-none color-1">
                      Have an account ? If not please
                      <Link onClick={(register) => setRegister(true)}>
                        {" "}
                        register.
                      </Link>
                    </div>
                    <div className="my-3">
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Email"
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder="Password"
                      />
                    </div>
                    <div className="mb-2 d-grid">
                      <input
                        className="btn bg-color-1 text-light"
                        type="submit"
                        value="Submit"
                      />
                    </div>
                    <div className="mb-3 text-end">
                      <Link className="text-decoration-none color-1">
                        Forgot Password
                      </Link>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div className="container text-start my-5">
          <div className="row ">
            <div className="col-md-6 m-auto">
              <form
                id="guest_user_register"
                onChange={InputValue}
                onSubmit={handleSubmit}
              >
                <div className="card bg-dark">
                  <div className="card-body row text-white">
                    <div className="col-md-12">
                      <p htmlFor="name">
                        Already registered ? Please{" "}
                        <Link
                          onClick={() => setRegister(false)}
                          className="text-primary"
                        >
                          {" "}
                          sign in{" "}
                        </Link>{" "}
                      </p>
                    </div>
                    <div className="my-3 col-md-6">
                      <label htmlFor="name">Full name: *</label>
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="First Name and Last Name"
                        id="name"
                      />
                    </div>
                    <div className="my-3 col-md-6">
                      <label htmlFor="email">Email: *</label>
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Email Address"
                        id="email"
                      />
                    </div>
                    <div className="my-3 col-md-6">
                      <label htmlFor="Password">Password: *</label>
                      <input
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder="Password"
                        id="password"
                      />
                    </div>
                    <div className="my-3 col-md-6">
                      <label htmlFor="phone">Phone: *</label>
                      <input
                        type="text"
                        name="phone"
                        className="form-control"
                        placeholder="Phone No"
                        id="phone"
                      />
                    </div>

                    {/* </div> */}
                    {/* <div className="my-3 col-md-6">
                        <label  htmlFor="image" >image (Optional) </label>
                        <input
                            type="file"
                            name="image"
                            className="form-control"
                            id="image"
                        />
                        </div> */}
                    <div className="mb-3">
                      <label htmlFor="address1">Address Line 1: *</label>
                      <textarea
                        name="address_line_1"
                        id="address_line_1"
                        placeholder="Unit No, Apt, Street Address"
                        className="form-control"
                      ></textarea>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="address2">Address Line 2: *</label>
                      <textarea
                        name="address_line_2"
                        id="address_line_2"
                        placeholder="City, State, ZIP Code"
                        className="form-control"
                      ></textarea>
                    </div>
                    {/* <div className="mb-3">
                      <label htmlFor="city">City: </label>
                      <input
                        type={"text"}
                        name="city"
                        id="city"
                        placeholder="Enter 
                        city"
                        className="form-control"
                      ></input>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="state">State: *</label>
                      <select name="state" id="state" style={{ fontSize: '18px', borderColor: '#C64A24' }} className="form-control" aria-label="Default select example"
                        >
                        <option defaultValue={""}
                        value={""}
                                                    
                        >Select State*</option>
                        {
                          statesData.map((state)=>(
                            <option key={state.abbreviation} value={state?.name}                       
                        >{state?.name}</option>
                          ))
                        }
                        </select>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="zipcode">Zip Code: *</label>
                      <input
                      type={"text"}
                        name="zipcode"
                        id="zipcode"
                        placeholder="ZIP Code. Eg: 9361"
                        className="form-control"
                      ></input>
                    </div> */}
                    <div className="mb-3">
                      <label htmlFor="address3">Country/Region: *</label>
                      <select name="country" id="country" style={{ fontSize: '18px', borderColor: '#C64A24' }} className="form-control" aria-label="Default select example"
                        >
                        <option defaultValue={""}
                        value={""}
                                                    
                        >Select Country*</option>
                        <option  value={"United States"}                       
                        >United States</option>

                        </select>
                    </div>
                    <div className="mb-2 d-grid">
                      <input
                        className="btn bg-color-1 text-light"
                        type="submit"
                        value="Submit"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
            </> }
            </>    
      

      <Footer />
      <BottomFix />
    </div>
  );
};
