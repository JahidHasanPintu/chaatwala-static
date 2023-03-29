import React, { Fragment, useEffect} from 'react'
import "./Goods.css";

export const Goods = (props) => {


   
    useEffect(() => {
    })

    return (
        <Fragment>
            <div className='col-sm-6 col-md-3 mb-3'>
                <div className='card border pointer card-hover' >
                    
                        <img style={{ height: "175px" }} className='img-fluid card-img-top' src={props.image} alt={props.name} />
                        <div className='card-body ' >
                        
                            <h5 className='mb-0 mt-2 color-1'  >{props.name.length < 20 ? props.name : props.name.slice(0, 20) + '...' }</h5>
                            <h5 className='mb-0 mt-2 mb-3 text-dark'>Price: ${props.price}</h5>
                            <a href='https://order.tbdine.com/pickup/45349'  className='btn btn-outline-danger color-1'><strong>Order Now</strong></a>
                        </div>
                    
                </div>
            </div>
        </Fragment>


    )
}