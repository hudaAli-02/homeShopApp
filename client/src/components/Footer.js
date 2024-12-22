import React from 'react';
import '../App.css';
import { Link } from "react-router-dom";
import {Navbar,Nav,NavItem} from "reactstrap";


const Footer = () => {
  return (
    <footer className="footer">
      <Navbar>

           <Nav>
        <h4>THE COZY CORNER </h4>

        <NavItem className="footer-links">
            <Link to="/"> Home </Link>
            <Link to="/about"> About </Link>
          <Link to="contact"> Contact </Link>
          </NavItem>
        <hr></hr>
     
      <p>© 2024 The Cozy Corner</p>
    
  <Link to="#privacy">Privacy & Policy</Link> | <Link to="#terms">Terms & Conditions</Link>
       </Nav>
      </Navbar>
    </footer>




  );
};

export default Footer;
