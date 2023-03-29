import React, { useRef} from 'react';
import { ChaatWalaMap } from './ChaatWalaMap'
import { Footer } from '../../layouts/frontend/Footer'
import Navbar from '../../layouts/frontend/Navbar'
import { TopNav } from '../../layouts/frontend/TopNav'
import { toast } from "react-toastify";

import emailjs from '@emailjs/browser';

export const Contact = () => {
    const form = useRef();
    const sendEmail = (e) => {
      e.preventDefault();
      console.log(form.current);
  
      emailjs.sendForm('service_m98pr0k', 'template_cj741aw', form.current, 'oXsaH8pyvYoSw5rtL')
        .then((result) => {
            toast.success("Your message has been send successfully", {
                position: "top-right",
              });
              e.target.reset();
            

        }, (error) => {
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
                                        <div className="col-md-12 mb-4">
                                            <div className="form-group">
                                                <textarea className="form-control" cols="30" rows="4" placeholder="Message" name="message"></textarea>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group d-grid">
                                                <input className='btn bg-color-1 text-light' 
                                                type="submit" value="Send" />
                                            </div>
                                        </div>
                                    </div>
            
                                
                                </form>
                                    
                                </div>
                            </div>
                        </div>

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
