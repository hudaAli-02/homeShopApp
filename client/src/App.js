import React from 'react';
import './App.css';
import Header from './components/Header';
import Home from "./components/Home";
import Footer from "./components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router , Routes , Route} from "react-router-dom";
import {Container,Row} from "reactstrap";
import Login from "./components/Login";
import Products from './components/Products';
import About from './components/About';
import Register from './components/Register';
import Profile from './components/Profile';
import CartPage from './components/cartPage';
import { useSelector } from 'react-redux';

const App = () => {
  const email =useSelector((state) => state.customers.customer.email);
  return (
    <Container fluid>
      <Router>
    <Row className="main">
    <Row>
          {email ? (
            <>
              <Header />
            </>
          ) : null}
        </Row>
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/about" element={<About />}></Route>
      <Route path="/products" element={<Products />}></Route>
      <Route path="/cart" element={<CartPage />} />

      <Route path="/login" element={<Login />}></Route>
      <Route path="/Register" element={<Register />}></Route>
      <Route path="/profile" element={<Profile />}></Route>

      
    </Routes>
  </Row>
  <Row>
          {email ? (
            <>
              <Footer />
            </>
          ) : null}
        </Row>
</Router>
</Container>
  );
};

export default App;
