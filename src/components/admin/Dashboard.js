import React, { Fragment, useEffect, useState } from "react";
import { Footer } from "../../layouts/frontend/Footer";
import Navbar from "../../layouts/frontend/Navbar";
import { TopNav } from "../../layouts/frontend/TopNav";
import { BottomFix } from "../frontend/BottomFix";
import profile from "../../assets/frontend/img/common/avator.jpg";
import { postApi } from "../../api/apiCall";
import { toast } from "react-toastify";
import { CheckCircle,Edit, Check, Eye, EyeOff, Download } from "react-feather";
import { NotFound } from "../frontend/NotFound";
import { CHANGE_PAGE } from "../../Helpers/helper";
import Pagination from "../../Helpers/Pagination";
import Spinner from "../frontend/Spinner/Spinner";
export const Dashboard = (props) => {

  const [loading, setLoading] = useState(false);


  const [LoginToken, setLoginToken] = useState(
    localStorage.getItem("user-token")
      ? JSON.parse(localStorage.getItem("user-token"))
      : null
  );
  const [data, setData] = useState(
    localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []
  );
  const [orderList, setOrder] = useState([]);
  const [userList, setUser] = useState([]);
  const [orderStatusData, setOrderStatusData] = useState(null);
  const [itemShow, setItemShow] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItem, setTotalItem] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(1);
  const [formValue, setFormValue] = useState();
  const [paginate, setPaginate] = useState(null);
  const [userData, setUserData] = useState([]);

  const guestOrder = async (page = 1) => {
    setLoading(true);
    const response = await postApi("order/guest-orders", { page: page, pagination_num: 8 }, LoginToken);
    if (response) {
      if (response.code === 200) {
        setOrder(response?.data?.data);
        // console.log(response?.data?.data);
        setUser(response?.data?.user);
        setPaginate(response?.data?.paginator);
        setLoading(false);
      } else {
        toast.error(response.message[0], {
          position: "top-right",
        });
      }
    }
  };

  const changePage = (page) => {
    page = CHANGE_PAGE(paginate, page);
    guestOrder(page);
  };

  const itemShowHide = (key) => {
    !itemShow ? setItemShow(key) : setItemShow(null);
  };

  const orderStatus = async (id) => {
    setLoading(true);
    const response = await postApi(
      "order/guest-confirmation",
      { order_id: id },
      LoginToken
    );
    if (response) {
      if (response.code === 200) {
        guestOrder();
        toast.success(response.message[0], {
          position: "top-right",
        });
        setLoading(false);
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

  useEffect(() => {
    guestOrder();
  }, [data]);
  return (
    <Fragment>
      {LoginToken ? (
        <div>
          <TopNav />
          <Navbar data_update={data.length} />
          <>
            {
            loading ?<Spinner/>  :<div className="bg-light">
            <div className="container py-5">
              <div className="row">
                <div className="col-md-4 my-5">
                  <div className="card border-0">
                    <div className="card-body">
                      <img
                        style={{ marginTop: "-50px" }}
                        src={profile}
                        alt="My Profile"
                        className="img-fluid w-50 rounded-circle mb-3"
                      />
                      <h5>{userList ? userList?.name : null}</h5>
                      <h6>{userList ? userList?.email : null}</h6>
                      
                      <div className=" mb-4">
                          <h5 className="text-start">User Details</h5>
                          <hr />
                          <div className="row d-flex justify-content-between align-items-center">
                          <div className="col text-start">
                            <p className="fw-bold">Phone :</p> 
                          </div>
                          <div className="col text-end">
                            <p className="fw-bold">{userList ? userList?.phone : null}</p> 
                          </div>
                          </div>
                          <div className="row d-flex justify-content-between align-items-center">
                          <div className="col text-start">
                            <p className="fw-bold">Addres Line 1 :</p> 
                          </div>
                          <div className="col text-end">
                            <p className="fw-bold">{userList ? userList?.userinfo?.address_line_1 : null}</p> 
                          </div>
                          </div>
                          <div className="row d-flex justify-content-between align-items-center">
                          <div className="col text-start">
                            <p className="fw-bold">Addres Line 2 :</p> 
                          </div>
                          <div className="col text-end">
                            <p className="fw-bold">{userList ? userList?.userinfo?.address_line_2 : null}</p> 
                          </div>
                          </div>
                          <div className="row d-flex justify-content-between align-items-center">
                          <div className="col text-start">
                            <p className="fw-bold">Country :</p> 
                          </div>
                          <div className="col text-end">
                            <p className="fw-bold">{userList ? userList?.userinfo?.country : null}</p> 
                          </div>
                          </div>
                          <div>
                          <h6
                                    style={{ textAlign: "left" }}
                                    className="mt-1 mb-3 text-primary"
                                    
                                    data-bs-toggle="modal" data-bs-target="#exampleModal"
                                  >
                                    {" "}
                                    <p
                                      onClick={() =>
                                        // console.log(userList.phone)
                                        shippingAdressModal(userList.userinfo.user_id)
                                      }
                                      className="pointer"
                                    >
                                      <Edit /> Change Details{" "}
                                    </p>
                                  </h6>

                                  {/* Change details modal is here  */}
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

                                                <Fragment key={userList ? userList?.userinfo?.id: null}>
                                                  <div className="mb-3 text-start">
                                                  <label htmlFor="phone">Phone : *</label>
                                                  <input
                                                  type={'text'}
                                                  name="phone"
                                                  id="phone"
                                                  defaultValue={userList ? userList?.phone: null}
                                                  className="form-control"
                    
                                                ></input>
                                                </div>
                                                  <div className="mb-3 text-start">
                                                  <input
                                                  type={'text'}
                                                  name="user_id"
                                                  id="user_id"
                                                  value={userList ? userList?.userinfo?.user_id : null}
                                                  className="form-control d-none"
                                                  readOnly
                                                ></input>
                                                    <label htmlFor="address1">Address Line 1: *</label>
                                                    <textarea
                                                      name="address_line_1"
                                                      id="address_line_1"
                                                      defaultValue={userList ? userList?.userinfo?.address_line_1 : null}
                                                      placeholder="Unit No, Apt, Street Address"
                                                      className="form-control"
                                                    ></textarea>
                                              
                                                </div>
                                            <div className="mb-3 text-start">
                                              <label htmlFor="address2">Address Line 2: *</label>
                                              <textarea
                                                name="address_line_2"
                                                id="address_line_2"
                                                defaultValue={userList ? userList?.userinfo?.address_line_2 : null}
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
                                                  value={userList ? userList?.userinfo?.country : null}
                                                  className="form-control"
                                                  readOnly
                                                ></input>
                                            </div>


                                                </Fragment>
                                             
                                          
                                            
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
                  </div>
                </div>
                <div className="col-md-8 my-5">
                  <div className="row d-none  d-md-block">
                  <h6 className="mb-2 text-start">Last order status</h6>
                  <ol className="progtrckr" data-progtrckr-steps="5">
                    { orderList.length? orderList?.map((item, key) => (
                      (key===0) ?
                        <Fragment key={key} >
                        <li className={(item.status === 'pending' || item.status === 'prepairing' || item.status === 'on_the_way' || item.status === 'delivered') ? 'progtrckr-done' : 'progtrckr-todo'}>Pending</li> 
                        <li className={(item.status === 'prepairing'  || item.status === 'on_the_way' || item.status === 'delivered') ? 'progtrckr-done' : 'progtrckr-todo'}> Preparing</li> 
                        <li className={(item.status === 'on_the_way' || item.status === 'delivered') ? 'progtrckr-done' : 'progtrckr-todo'}>On th way</li> 
                        <li className={(item.status === 'delivered') ? 'progtrckr-done' : 'progtrckr-todo'}>Delivered</li> 
                        </Fragment>
                      : null
                    )) : null }
                  </ol>
                  </div>
                  <div className="row mt-4">
                    <div className="col">
                      <h6 className="text-start my-2">Latest orders</h6>
                      <div className="col-md-12  align-top table-responsive">
                        <table className="table table-condensed table-striped">
                          <thead>
                            <tr>
                              <th> SL No. </th>
                              <th> Invoice </th>
                              {/* <th> Shipping Address </th> */}
                              <th> Status </th>
                              <th> Action </th>
                            </tr>
                          </thead>

                          <tbody>
                            {orderList.length
                              ? orderList?.map((item, key) => (
                                  <Fragment key={key}>
                                    <tr className="text-center">
                                      <td>{++key}</td>
                                      <th>{item?.order_name}</th>
                                      {/* <td>{item?.shipping_adress?.address_line_1}</td> */}
                                      <td>
                                        <button
                                          className={
                                            item.status === "pending"
                                              ? "btn btn-sm  btn-outline-warning w-100"
                                              : item.status === "confirmed"
                                              ? "btn btn-sm  btn-outline-primary w-100"
                                              : "btn btn-sm  btn-outline-success w-100"
                                          }
                                        >
                                          {item.status === "confirmed"
                                            ? "On the way"
                                            : item.status === "delivered"
                                            ? "Delivered"
                                            : "Pending"}
                                        </button>
                                      </td>
                                      <td>
                                        {item.status !== "delivered" ? (
                                          <button
                                            className="btn btn-sm btn-outline-primary ms-1"
                                            onClick={() => orderStatus(item.id)}
                                            data-placement="bottom"
                                            title="Confirm Order"
                                          >
                                            <CheckCircle height={15} />
                                          </button>
                                        ) : (
                                          <button
                                            className="btn btn-sm btn-outline-success ms-1"
                                            data-placement="bottom"
                                            title="Delivery confirmed"
                                          >
                                            <Check height={15} />
                                          </button>
                                        )}
                                        <button
                                          className="btn btn-sm btn-outline-primary ms-1"
                                          onClick={() => itemShowHide(key)}
                                          title="Order Details"
                                        >
                                          {!itemShow ? (
                                            <Eye height={14} />
                                          ) : (
                                            <EyeOff height={12} />
                                          )}
                                        </button>
                                      </td>
                                    </tr>
                                    {itemShow === key ? (
                                      <Fragment>
                                        {item?.order_item ? (
                                          <Fragment className="collapse" id={key}>
                                            <tr>
                                              <th></th>
                                              <th>SL</th>
                                              <th>Item Name</th>
                                              <th>Quantity</th>
                                              <th>Price</th>
                                            </tr>
                                            {item?.order_item?.map(
                                              (value, index) => (
                                                <tr>
                                                  <td></td>
                                                  <td>{++index}</td>
                                                  <td>{value?.name}</td>
                                                  <td>{value?.quantity}</td>
                                                  <td>${value?.price}</td>
                                                </tr>
                                              )
                                            )}
                                            <tr>
                                              <th></th>
                                              <th
                                                colSpan={2}
                                                className=" text-center"
                                              >
                                                Total
                                              </th>
                                              <th className="">
                                                {item?.order_item.reduce(
                                                  (a, report) =>
                                                    parseInt(a) +
                                                    parseInt(report?.quantity),
                                                  0
                                                )}
                                              </th>
                                              <th className="">$
                                                {item?.order_item.reduce(
                                                  (a, report) =>
                                                    parseFloat(a) +
                                                    parseFloat(report?.price),
                                                  0
                                                )}
                                              </th>
                                            </tr>
                                          </Fragment>
                                        ) : null}
                                      </Fragment>
                                    ) : null}
                                  </Fragment>
                                ))
                              : null}
                          </tbody>
                        </table>
                        <div>
                            {paginate ? (
                            <Pagination
                            paginator={paginate}
                            changePage={changePage}
                      ></Pagination>
                    ) : (
                      ""
                    )}
                        </div>
                      </div>
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
          </div> }
            </>
          
          <Footer />
          <BottomFix />
        </div>
      ) : (
        <NotFound />
      )}
    </Fragment>
  );
};
