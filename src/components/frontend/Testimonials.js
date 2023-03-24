import React from 'react'
import testiUser1 from '../../assets/frontend/img/common/testimonial-user-1.jpg';
import testiUser2 from '../../assets/frontend/img/common/testimonial-user-2.jpg';
import testiUser3 from '../../assets/frontend/img/common/testimonial-user-3.jpg';
import { Testimonial } from './sub/Testimonial';

export const Testimonials = () => {
  return (
    <div className="testimonials text-center text-light">
      <div className="primary-overlay">
        <div id="testimonialIndicators" className="carousel slide" data-bs-ride="true">
          <div className="carousel-indicators d-none">
            <button type="button" data-bs-target="#testimonialIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#testimonialIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#testimonialIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>
          <div className="carousel-inner">
            <Testimonial img={testiUser3} name="Jasmin Moslih" note="I just wanted to say that I have fallen IN LOVE with Chaatwala's food. I have sacrificed good wholesome food to “treat” myself and fulfill my hunger in the past, but i have found such satisfaction with awesome foods that I no longer need to eat junk. I was just having my Lamb Bowl and Fish Roll, and had to tell you how much I enjoy this stuff. It really is so good! My husband agrees!Keep making Delicious foods." />
            <Testimonial activeClass="active" img={testiUser2} name="Edmundo Castillo" note="The Chaatwalanyc has the friendliest staff! They're very attentive and great at offering suggestions if you can't decide what to order. I ordered the Chicken Paratha Roll with Mint Chutney and was pleasantly surprised by how creamy and delicious the sauce was. Plus the portions were quite large, especially for the price. I'll definitely go back soon" />
            <Testimonial img={testiUser1} name="Diane Cassara" note="One of our favorite Indian restaurants. There are many items on the menu that you don't find in most Indian restaurants. Try anything from the Chaat section of the menu for something really unique" />
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#testimonialIndicators" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#testimonialIndicators" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
  )
}
