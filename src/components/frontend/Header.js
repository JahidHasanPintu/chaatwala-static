import React from 'react'
import slider1 from '../../assets/frontend/img/slider/slider-1.webp'
import slider2 from '../../assets/frontend/img/slider/slider-2.webp'
import slider3 from '../../assets/frontend/img/slider/slider-3.webp'

export const Header = () => {
    return (
        <div className='header-section'>
            <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="true" data-bs-interval="3000">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src={slider1} className="d-block w-100" alt="..." />
                        {/* <div className="carousel-caption d-block">
                            <h1><strong>Fresh, fast and delicious</strong></h1>
                            <p className='lead'>
                                <strong>At our Restaurant, we offer meals of excellent quality and <br /> invite you to try our delicious food</strong>
                            </p>
                            <button className='btn btn-outline-light'><strong>Order Now</strong></button>
                        </div> */}
                    </div>
                    <div className="carousel-item">
                        <img src={slider2} className="d-block w-100" alt="..." />
                        {/* <div className="carousel-caption d-block">
                            <h1><strong>Satisfaction Guarantees</strong></h1>
                            <p className='lead'>
                                <strong>We are glad to welcome customers from all over the world and <br /> offer the best food and ingredients for you joy!</strong>
                            </p>
                            <button className='btn btn-outline-light'><strong>Order Now</strong></button>
                        </div> */}
                    </div>
                    <div className="carousel-item">
                        <img src={slider3} className="d-block w-100" alt="..." />
                        {/* <div className="carousel-caption d-block">
                            <h1><strong>Discover Delicious</strong></h1>
                            <p className='lead'>
                                <strong>Eat delicious food, Grab a drink. But most of all, relax! <br /> We thank you for your continued support</strong>
                            </p>
                            <button className='btn btn-outline-light'><strong>Order Now</strong></button>
                        </div> */}
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    )
}
