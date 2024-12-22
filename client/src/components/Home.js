import React from 'react';
import '../App.css';
import shope2 from "../Images/shope2.png";
import shope3 from "../Images/shope3.png";
import { Link } from "react-router-dom";
import {Navbar,Nav,NavItem} from "reactstrap";
import { Row, Col } from "reactstrap"; 
import Posts from "./Posts";
import Customer from "./User";
import SharePosts from "./SharePost";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Home = () => {
  const navigate = useNavigate();
  const email = useSelector((state) => state.customers.customer.email);

  useEffect(() => {
    if (!email) {
      navigate("/login");
    }
  }, [email]); 

  
    return(
  <div className="main-content">
  
      <section className="intro">
        <div className="text">
          <p>
            We believe every piece of furniture should feel like home. Our collections are crafted
            to blend seamlessly into your life, bringing warmth, elegance, and functionality to
            every room.
          </p>
<button className="shop-now">
  <Navbar><Nav>
    <Link to="/products">Shop Now</Link>
       </Nav>
      </Navbar>
      </button>

        </div>
        <img
            src={shope2} 
            alt="Furniture"
        />
      </section>
      <section className="styles">
        <img
            src={shope3}
          alt="Living Room"
        />
        <div className="text">
          <h3 >Easy-Care Styles</h3>
          <p>Performance fabrics made for everyday life.</p>
        </div>
      </section>
      <Row>
        <Col md={3}>
          <Customer />
        </Col>
        <Col md={9}>
        <SharePosts />

        </Col>
      </Row>
      <Row>
        <Col md={3}></Col>
        <Col md={9}>
          <Posts />
        </Col>
      </Row>

</div>
    ); 
};

export default Home;