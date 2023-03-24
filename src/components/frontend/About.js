import React from 'react'
import Navbar from '../../layouts/frontend/Navbar'
import { TopNav } from '../../layouts/frontend/TopNav'
import shop from '../../assets/frontend/img/common/shop.jpg';
import { Footer } from '../../layouts/frontend/Footer';
import { BottomFix } from './BottomFix';

export const About = () => {
    return (
        <div>
            <TopNav />
            <Navbar />
            <div className='py-5'>
                <div>
                    <div className='container'>
                        <div className='row'>
                            <div className='col text-start'>
                                <h1 className='fw-bold mb-0 color-1 ms-md-5 mt-1'>About Us</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div className='container'>
                    <div className='row mt-5 text-start'>
                        <div className='col-md-6'>
                            <h2>About Our Restaurant</h2>
                            <p style={{ lineHeight: '1.8', letterSpacing: '1px' }} className='lead mt-4'>Chaatwalanyc, a unique South Asian Bangladeshi fusion restaurant in the heart of Jamaica, Queens. The concept of CHAATWALA has been inspired by the famous street snacks found in the streets of Dhaka, Mumbai, Karachi, Delhi, Kolkata, Chittagong, Kathmandu, and other major cities in South Asia. We communicate a new, creative approach to Bangladeshi, Indian, Pakistani street Entrees.</p>
                        </div>
                        <div className='col-md-6'>
                            <img className='img-fluid rounded' src={shop} alt='Shop' />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <BottomFix />
        </div>
    )
}
