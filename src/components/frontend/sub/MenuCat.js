import React from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { catWiseFilter } from '../../../redux/action/action';

export const MenuCat = (props) => {
    const dispatch = useDispatch();
    const nav = useNavigate();
    const menuSend = (catID) => {
        let data = {
            'cat_id': catID,
        }
        dispatch(catWiseFilter(data))
        nav('/food')
    }
    return (
        <div className='col-sm-6 col-md-3 mb-3 menu-cat' onClick={()=>menuSend(props.catID)}>
            <Link to='/info' className='text text-decoration-none'>
                <div className='text-dark p-3 rounded'>
                    <img style={{ height: "175px" }} className='img-fluid' src={props.image} alt={props.name} />
                    <h3 className='mb-0 mt-2'>{props.name}</h3>
                </div>
            </Link>
        </div>
    )
}
