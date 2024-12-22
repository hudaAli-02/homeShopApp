import React from 'react';
import '../App.css';
import shope4 from "../Images/shope4.png";
import shope5 from "../Images/shope5.png";
import {Navbar,Nav,NavItem} from "reactstrap";
import { Link } from "react-router-dom";
const About = () => {
  return (
    <section className="about">
    <h5>About the Cozy Corner</h5>
    <p>
      At The Cozy Corner, we are passionate about helping you create a home that reflects
      your style, comfort, and personality. Founded with a commitment to quality and inspired
      by simplicity, The Cozy Corner specializes in furniture that merges elegance with
      everyday functionality.
    </p>
    <h6>Our Vision</h6>
    <p>
      We believe every piece of furniture tells a story. Our goal is to bring you pieces that
      elevate your living spaces, adding warmth, charm, and a touch of sophistication.
    </p>


<div className='h'>
<div className="h-text">
  <h2>Welcome to The Cozy Corner</h2>
  <p>Where every piece feels like home.</p>
  <button className="shop-now">
  <Navbar><Nav>
    <Link to="/products">Shop Now</Link>
       </Nav>
      </Navbar>
      </button></div>
<img src={shope4} alt="Cozy Chair" className="image" />
</div>

<div className='sunny-days'>
<div className="sunny-days-image">
        <img src={shope5} alt="Outdoor furniture" />
      </div>
      <div className="sunny-days-text">
        <h6>Sunny Days Ahead</h6>
        <p>
          Get set for warm weather with these popular outdoor pieces. 
          Perfect for your next lawn party!
        </p>
      </div></div>
</section>

 
  );
};

export default About;