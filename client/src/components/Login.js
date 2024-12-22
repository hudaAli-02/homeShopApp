import React from 'react';
import '../App.css';
import { Container, Form, FormGroup, Label, Button, Input, Row,Col} from "reactstrap";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from '../Features/Customer';



const Login = () => {
    const [email, setemail] = useState();
  const [password, setpassword] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const customer = useSelector((state) => state.customers.customer);
  const isSuccess = useSelector((state) => state.customers.isSuccess);
  const isError = useSelector((state) => state.customers.isError);

  useEffect(() => {
    if (isError) {
      navigate("/login");
    }
    if (isSuccess) {
      navigate("/");
    }else {
      navigate("/login");
    }
  }, [customer, isError, isSuccess]);

  const handleLogin = () => {
    const CustomerData = {
      email: email,
      password: password,
    };
    dispatch(login(CustomerData));
  };
 return (
  <div >
  <Container>
  <Row className="justify-content-center">
      <Col md={6} lg={4}>
        <div className="login-box">
          <h2 className="text-center">LOGIN</h2>
          <Form>
            <FormGroup>
              <Label for="email"></Label>
              <Input type="email" 
              name='email' id="email" 
              placeholder="Enter Your Email"
              onChange={(e) => setemail(e.target.value)} />
            </FormGroup>
            <FormGroup>
              <Label for="password"></Label>
              <Input name="password" 
              type="password" id="password"
              placeholder="Enter Your Password"
              onChange={(e) => setpassword(e.target.value)} />
            </FormGroup>
            <p className="text-center mt-3">
              New Customer?<Link to="/Register">CREATE ACCOUNT</Link>
            </p>
            <div className="text-center">
              <Button color="dark" 
              className="btn"
              onClick = { () => handleLogin()}
              >LOGIN</Button>
              
            </div>
          </Form>
        </div>
      </Col>
    </Row>
  </Container>
</div>
);
};

export default Login;