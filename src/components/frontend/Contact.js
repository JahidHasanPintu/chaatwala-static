import React, { useRef, useState } from 'react';
import { ChaatWalaMap } from './ChaatWalaMap'
import { Footer } from '../../layouts/frontend/Footer'
import Navbar from '../../layouts/frontend/Navbar'
import { TopNav } from '../../layouts/frontend/TopNav'
import { Link } from 'react-router-dom'
import { toast } from "react-toastify";

import emailjs from '@emailjs/browser';

export const Contact = () => {
    const form = useRef();
    const [formValue, setFormValue] = useState();
    const [otpCode, setOtpCode] = useState(12345);
    const [verification, setVerification] = useState(12345);
    const InputValue = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        const data = { ...formValue, [name]: value };
        setFormValue(data);
        // console.log(data);
      };
      const handleSubmit =(e)=>{
        e.preventDefault();
        if(formValue.otp==otpCode){
            // console.log(formValue);
            // console.log("Verified");
            sendEmail();

        }else{
            // console.log("Did not match");
            toast.success("OTP did not matched!!", {
                position: "top-right",
              });
        }
        
        
      }

      const sendOtp = (e) => {
        e.preventDefault();
    
        emailjs.sendForm('service_m98pr0k', 'template_78egcl4', form.current, 'oXsaH8pyvYoSw5rtL')
          .then((result) => {
              // console.log(result.text);
              toast.success("Verification code has been send!!", {
                  position: "top-right",
                });
                // e.target.reset();
              
  
          }, (error) => {
              // console.log(error.text);
              toast.success("Failed to send!! ", {
                  position: "top-right",
                });
          });
      };

    const sendEmail = (e) => {
      e.preventDefault();
      console.log(form.current);
  
      emailjs.sendForm('service_m98pr0k', 'template_cj741aw', form.current, 'oXsaH8pyvYoSw5rtL')
        .then((result) => {
            // console.log(result.text);
            toast.success("Your message has been send successfully", {
                position: "top-right",
              });
              e.target.reset();
            

        }, (error) => {
            // console.log(error.text);
            toast.success("Failed to send message", {
                position: "top-right",
              });
        });
    };
    return (
        <div>
            <TopNav />
            <Navbar />
            
            <div className='py-5'>
                <div>
                    <div className='container'>
                        <div className='row'>
                            <div className='col text-start'>
                                <h1 className='fw-bold mb-0 color-1 ms-md-5 mt-1'>Contact Us</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div className='container'>
                    <div className="row mt-5 text-start">
                        <div className="col-md-8">
                            <div className="card border-0 bg-light">
                                <div className="card-body">
                                    <h4>Please fill out this form to contact us</h4>

                                <form ref={form} onSubmit={sendEmail}>
                                <div className="row mt-4">
                                        <div className="col-md-6 mb-4">
                                            <div className="form-group">
                                                <input className="form-control" type="text" placeholder="First Name" name="user_name" />
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-4">
                                            <div className="form-group">
                                                <input className="form-control" type="text" placeholder="Last Name" name="user_lname" />
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-4">
                                            <div className="form-group">
                                                <input className="form-control" type="email" placeholder="Email" name="user_email" />
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-4">
                                            <div className="form-group">
                                                <input className="form-control" type="text" placeholder="Phone Number" name="user_phone" />
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-4 d-none">
                                            <div className="form-group">
                                                <input className="form-control" type="text" value={otpCode} name="otp_code" readOnly/>
                                            </div>
                                        </div>
                                        <div className="col-md-12 mb-4">
                                            <div className="form-group">
                                                <textarea className="form-control" cols="30" rows="4" placeholder="Message" name="message"></textarea>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group d-grid">
                                                {/* <input className="btn bg-color-1 text-light" type="submit" value="Send" /> */}
                                                {/* <Link to='/info' className='btn bg-color-1 text-light'>Send</Link> 
                                                data-bs-toggle="modal" data-bs-target="#exampleModal"
                                                */}
                                                <input className='btn bg-color-1 text-light' 
                                                
                                                
                                                type="submit" value="Send" />
                                            </div>
                                        </div>
                                    </div>
            
                                
                                </form>
                                    
                                </div>
                            </div>
                        </div>

                        {/* Modal start  */}
                        {/* <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Verify Your Email</h5>
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
                                    <div className="mb-3 text-start">
                                    <label htmlFor="address1">Enter Verification Code: *</label>
                                    <input
                                        type={'text'}
                                        name="otp"
                                        id="otp"
                                        className="form-control"
                                    ></input>
                                    </div>
                                
                                    
                                </div>
                            </div>
                            </div>


                            <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <input
                                    data-bs-dismiss="modal"
                                    className="btn bg-color-1 text-light"
                                    type="submit"
                                    value="Verify"
                                    />
                            </div>
                            </form>
                        </div>
                        </div>
                    </div> */}
                        {/* Modal Ends  */}

                        <div className="col-md-4">
                            <div className="card border-0 bg-light">
                                <div className="card-body">
                                    <h4 className='mt-2'>Get In Touch</h4>
                                    <p>Chaatwalanyc, a unique South Asian Bangladeshi fusion restaurant in the heart of Jamaica, Queens.</p>
                                    <h4>Address</h4>
                                    <p className='mb-3'>83-27 Parsons Blvd, Jamaica, New York 11432</p>
                                    <h4>Email</h4>
                                    <p className='mb-3'>admin@chaatwalanyc.com</p>
                                    <h4>Phone</h4>
                                    <p className='mb-5 mt-2 '>+1 (718) 480 6399</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ChaatWalaMap />
            <Footer />
        </div>
    )
}
