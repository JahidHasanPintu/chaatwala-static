import React from 'react'
import { Link } from 'react-router-dom'
import { Footer } from '../../layouts/frontend/Footer'
import Navbar from '../../layouts/frontend/Navbar'
import { TopNav } from '../../layouts/frontend/TopNav'

import { BottomFix } from './BottomFix'

export const NotFound = () => {
    return (
        <div>
            <TopNav />
            <Navbar />
            <div className='container my-5'>
                <div className='row py-5'>
                    <div className='col py-5'>
                        <div>
                            <h1><i>OPPS!</i></h1>
                        </div>
                        <div>
                            <h3><strong>404</strong></h3>
                        </div>
                        <div>
                            <h1>Page Not Found</h1>
                        </div>
                        <div className='mt-3'>
                            <Link to='/'>chaatwalanyc.com</Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <BottomFix />
        </div>
    )
}
