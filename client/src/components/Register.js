import { Container, Form, Label, Button, Input, Row, Col,FormGroup} from "reactstrap";
import {useForm} from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomerSchemaValidation } from "../Validation/CustomerValidation";
import { addCustomer, deleteCustomer, updateCustomer } from "../Features/Customer";
import{yupResolver} from "@hookform/resolvers/yup";
import { registerCustomer } from "../Features/Customer";

const Register = () =>{

  const [username, setusername]=useState("");
  const [email, setemail]=useState("");
  const [password, setpassword]=useState("");
  const [confirmPassword, setconfirmPassword]=useState("");
  const [country, setcountry]=useState("");
  const [phone, setphone]=useState("");
  const [firstName, setfirstName]=useState("");
  const [lastName, setlastName]=useState("");
  const dispatch=useDispatch();
  const navigate = useNavigate();

  const{
    register,
    handleSubmit,
    setValue,
    trigger,
    formState:{errors},
  }= useForm({
    resolver: yupResolver(CustomerSchemaValidation),
  });

  const onSubmit=(data)=>{
    try{
      const CustomerData={
        username:data.username,
        email:data.email,
        password:data.password,
        country:data.country,
        phone:data.phone,
        firstName:data.firstName,
        lastName:data.lastName,
        
    
      };
      console.log( "Form Data ", data);
      alert("Validation all good.");
      dispatch(registerCustomer(CustomerData));
      navigate("/login");

    }catch(error){
      console.log( error);
    }
  }

  const handleDelete = (email) => {
    dispatch(deleteCustomer(email));
  }

  const handleUpdate = (email) => {
    console.log(username);
    const CustomerData={
      username: username,
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      country:country,
      //confirmPassword:confirmPassword,
    };
    dispatch(updateCustomer(CustomerData));
  }
    return(
        <div className="create-account-page">
      <Container>
        <Row className="justify-content-center">
          <Col md={12} className="text-center">
            <h2 className="text-center">New Account</h2>
          </Col>
        </Row>

        <Row className="justify-content-center mt-4">
          <Col md={8}>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Row>
                <Col md={6}>
                <FormGroup>
                    <Input
                      type="text"
                      id="username"
                      placeholder="Username"
                      className="input-field"
                      {
                        ...register("username")
                      }
                      onChange={(e)=>{setValue("username",e.target.value);
                        trigger("username");
                      }} 
                      />
                     <p className="error">{errors.username?.message}</p>
                  </FormGroup>
                  <FormGroup>
                    <Input
                      type="email"
                      id="email"
                      placeholder="Email Address"
                      className="input-field"
                      {
                        ...register("email")
                      }
                      onChange={(e)=>{setValue("email",e.target.value);
                        trigger("email");
                      }} 
                      />
                     <p className="error">{errors.email?.message}</p>
                  </FormGroup>
                  <FormGroup>
                    <Input
                      type="password"
                      id="password"
                      placeholder="Password"
                      className="input-field"
                      {
                        ...register("password")
                      }
                      onChange={(e)=>{setValue("password",e.target.value);
                        trigger("password");
                      }} 
                      />
                     <p className="error">{errors.password?.message}</p>
                  </FormGroup>
                  <FormGroup>
                    <Input
                      type="password"
                      id="confirmPassword"
                      placeholder="Confirm Password"
                      className="input-field"
                      {
                        ...register("confirmPassword")
                      }
                      onChange={(e)=>{setValue("confirmPassword",e.target.value);
                        trigger("confirmPassword");
                      }} 
                      />
                     <p className="error">{errors.confirmPassword?.message}</p>
                  </FormGroup>
                  
                </Col>

                <Col md={6}>
                <FormGroup>
                    <Input
                      type="text"
                      id="country"
                      placeholder="Country"
                      className="input-field"
                      {
                        ...register("country")
                      }
                      onChange={(e)=>{setValue("country",e.target.value);
                        trigger("country");
                      }} 
                      />
                     <p className="error">{errors.country?.message}</p>
                  </FormGroup>
                  <FormGroup>
                    <Input
                      type="tel"
                      id="phone"
                      placeholder="Phone Number"
                      className="input-field"
                      {
                        ...register("phone")
                      }
                      onChange={(e)=>{setValue("phone",e.target.value);
                        trigger("phone");
                      }} 
                      />
                      <p className="error">{errors.phone?.message}</p>
                  </FormGroup>
                  <FormGroup>
                    <Input
                      type="text"
                      id="firstName"
                      placeholder="First Name"
                      className="input-field"
                      {
                        ...register("firstName")
                      }
                      onChange={(e)=>{setValue("firstName",e.target.value);
                        trigger("firstName");
                      }} 
                      />
                     <p className="error">{errors.firstName?.message}</p>
                  </FormGroup>
                  <FormGroup>
                    <Input
                      type="text"
                      id="lastName"
                      placeholder="Last Name"
                      className="input-field"
                      {
                        ...register("lastName")
                      }
                      onChange={(e)=>{setValue("lastName",e.target.value);
                        trigger("lastName");
                      }} 
                      />
                      <p className="error">{errors.lastName?.message}</p>
                  </FormGroup>
                </Col>
              </Row>
              <div className="text-center">
                <Button className="btn-new-acc" color="dark">Create Account</Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>

    );

}
export default Register;