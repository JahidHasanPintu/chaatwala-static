import React, { useState } from 'react';
import {useLocation} from 'react-router-dom';
import { Footer } from '../../../layouts/frontend/Footer';
import Navbar from '../../../layouts/frontend/Navbar';
import { TopNav } from '../../../layouts/frontend/TopNav';
import { BottomFix } from '../BottomFix';
import './FoodDetails.css';
import { ADD } from "../../../redux/action/action";
import { useDispatch } from 'react-redux';
import { ShoppingCart,User,Heart } from "react-feather";

const FoodDetails = () => {
    const location = useLocation();
    const food= location.state.item;
    const [currentImage, setCurrentImage] = useState(food.images[0].image);
    const dispatch = useDispatch();
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
    const changeImage = (image) => {
        setCurrentImage(image);
    }  
    return (
        
        <div>
            <TopNav />
            <Navbar />

            <div className="container">
		<div className="prod-card">
			<div className="prod-container-fliud">
				<div className="prod-wrapper prod-row">
					<div className="prod-preview col-md-6">
						
						<div className="prod-preview-pic prod-tab-content">
						  <div className="tab-pane active" id="pic-1"><img src={currentImage} /></div>
						  
						</div>
						<ul  className="prod-preview-thumbnail nav nav-tabs">
                            {	
                                food.images?.map(item => 
                                    
									 <li key={item.id}><img onClick={() => changeImage(item.image)} src={item.image}  /></li>
                                )}
                            
						</ul>
						
					</div>
					<div className="prod-details col-md-6 ms-5 me-5 ">
						<h3 className="prod-product-title">{food.name}</h3>
						<div className="rating">
							{/* <div className="stars">
								<span className="fa fa-star checked"></span>
								<span className="fa fa-star checked"></span>
								<span className="fa fa-star checked"></span>
								<span className="fa fa-star"></span>
								<span className="fa fa-star"></span>
							</div> */
							console.log(food)
							}
							<span className="review-no">Category: {food.category.cat_name}</span>
							</div>
							<p className="product-description pe-5">{food.details}</p>
							<h4 className="price">current price: <span>${food.price}</span></h4>
							{/* <p className="vote"><strong>91%</strong> of buyers enjoyed this product!</p> */}
						
						<div className="action">
							<button className='btn btn-outline-danger me-2 color-1' onClick={() => send(food)} type="button">Add to Cart</button>
							<button className="like btn btn-default" type="button"><Heart/></button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
            <Footer />
            <BottomFix />
        </div>


    );
};

export default FoodDetails;