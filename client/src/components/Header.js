import React from 'react';
import '../App.css';
import {Navbar,Nav,NavItem} from "reactstrap";
import shope from "../Images/shope.png";
import { Link } from "react-router-dom";
import { logout } from "../Features/Customer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlelogout = async () => {
    dispatch(logout());

        await new Promise((resolve) => setTimeout(resolve, 100));

        navigate("/login"); 
  };

  return (
    <>
  
    <Navbar className="header">
    <h1>
    The Cozy Corner  
    </h1>
        <Nav>
      
          <NavItem className="nav-links">
            <Link to="/"> Home </Link>
        
            <Link to="/about"> about </Link>
    
          <Link to="/products"> products </Link>
       
          <Link to="/login"> login  </Link>
          <Link to="/profile"> profile  </Link>
            <Link onClick={handlelogout}>logout</Link>
          </NavItem>

          <button className="cart-button">
              <Link to="/cart"><img src={shope} className="shope" /></Link>
              </button>

              
        </Nav>
      </Navbar>
    </>
  );
};

export default Header;
