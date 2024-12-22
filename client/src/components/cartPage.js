import React from "react";
import { useLocation } from "react-router-dom";
import { Container, Row, Col } from "reactstrap"; //import the Reactstrap Components
import Customer from "./User";
import SharePosts from "./SharePost";
import Posts from "./Posts";

function CartPage() {
  const location = useLocation(); 
  const cartTotal = location.state?.cartTotal || 0;

  return (
    <>
    <div>
      <h1>Cart</h1>
      <h2>Total Price: ${cartTotal} OMR</h2>
    </div>

    
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
    </>
  );
}export default CartPage;