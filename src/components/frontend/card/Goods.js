import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ADD } from "../../../redux/action/action";
import "./Goods.css";

export const Goods = (props) => {
    const { item } = props;
    const dispatch = useDispatch();
    const [dataItem, setDataItem] = useState({});
    const send = (e) => {
        let data = {
            'id': e.id,
            'image': e.images[0].image,
            'category': e.category.name,
            'name': e.name,
            'details': e.details,
            'price': e.price,
            'quantity': 1
        }
        dispatch(ADD(data))
    }
    
    // console.log("out", dataItem);
    const sendFromModal = () => {

    }
    useEffect(() => {
    })

    const navigate = useNavigate();
    // const navigateToFoodDetails = item =>{
        
    //     navigate(`/food-details/${item.id}`,{state:{item}});
        
    // }
    return (
        <Fragment>
            <div className='col-sm-6 col-md-3 mb-3'>
                <div className='card border pointer card-hover' >
                    
                        <img style={{ height: "175px" }} className='img-fluid card-img-top' src={props.image} alt={props.name} />
                        <div className='card-body ' >
                        
                            <h5 className='mb-0 mt-2 color-1'  >{props.name.length < 20 ? props.name : props.name.slice(0, 20) + '...' }</h5>
                            {/* <p className="product-description text-dark">{item.details}</p> */}
                            <h5 className='mb-0 mt-2 mb-3 text-dark'>Price: ${props.price}</h5>
                            <a href='https://order.tbdine.com/pickup/45349' target={"_blank"} className='btn btn-outline-danger color-1'><strong>Order Now</strong></a>
                        </div>
                    
                </div>
            </div>
        </Fragment>


    )
}