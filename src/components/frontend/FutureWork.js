import React from 'react'
import { Footer } from '../../layouts/frontend/Footer'
import Navbar from '../../layouts/frontend/Navbar'
import { TopNav } from '../../layouts/frontend/TopNav'
import { BottomFix } from './BottomFix'

import chaatwalanyc_menu from '../../assets/frontend/documents/ChaatWalaMenu.pdf';

export const FutureWork = () => {
    return (
        <div>
            <TopNav />
            <Navbar />
            <div className='container my-5'>
                <div className='row'>
                    <div className='col py-5'>
                        <h2>We are working on this site</h2>
                        <h3>We complete this site as soon as possible</h3>
                        <div className='mt-5'>
                            <h3>Contact Us</h3>
                            <h4>Phone: +1 (718) 480 6399</h4>
                            <h4>Email: admin@chaatwalanyc.com</h4>
                            <p>Address: 83-27 Parsons Blvd, Jamaica, New York 11432</p>
                        </div>
                        <div className='mt-3'>
                            <a className='btn bg-color-1 text-light' href={chaatwalanyc_menu} target="_blank">Click To See Our Menu Categories</a>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <BottomFix />
        </div>
    )
}
