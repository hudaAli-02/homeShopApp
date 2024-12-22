import {
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  Container,
  Row,
  Col,
} from "reactstrap";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { BrowserRouter as  useNavigate } from "react-router-dom";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateCustomerProfile } from "../Features/Customer";
import {CustomerSchemaValidation} from "../Validation/CustomerValidation";
//import { useNavigate } from "react-router-dom";
import Customer from "./User";


const Profile = () => {
const customer = useSelector((state) => state.customers.customer);
const [username, setusername] = useState(customer.username);
const [pwd, setPwd] = useState(customer.password);
const [confirmPassword, setConfirmPassword] = useState(customer.password);
const [phone, setphone] = useState(customer.phone);
const [country, setcountry] = useState(customer.country);
const [firstName, setfirstName] = useState(customer.firstName);
const [lastName, setlastName] = useState(customer.lastName);
const [profilePic, setProfilePic] = useState(customer.profilePic);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit, 
    formState: { errors },
  } = useForm({
    resolver: yupResolver(CustomerSchemaValidation), 
  });
  const handleUpdate = (event) => {
    event.preventDefault();
    const CustomerData = {
      email: customer.email, 
      username: username, 
      password: pwd,
      country:country, 
      phone:phone,
      firstName:firstName,
      lastName:lastName,
      profilePic: profilePic,
    };
    console.log(CustomerData);
    dispatch(updateCustomerProfile(CustomerData));
    alert("Profile Updated.");
    navigate("/profile");
  };
  const handleFileChange = (event) => {
    const uploadFile = event.target.files[0];
    if (!uploadFile) alert("No file uploaded");
    else setProfilePic(event.target.files[0]);
  };

  useEffect(() => {
    if (!customer.email) {
      navigate("/login");
    }
  }, [customer.email, navigate]);

  return (
    <Container fluid>
      <h1>{username}'s Profile</h1>
      <Row>
        <Col md={3}>
          <Customer />
        </Col>
        <Col md={4}>
          <Form onSubmit={handleUpdate}>
            Upload Photo
            <br />
            <input type="file" name="profilePic" onChange={handleFileChange} />
            <FormGroup>
              <Label for="username">user Name</Label>
              <Input
                id="username"
                name="username"
                placeholder="User Name..."
                type="text"
                value={username}
                {...register("username", {
                  onChange: (e) => {
                    setusername(e.target.value);
                  },
                })}
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                id="password"
                name="password"
                placeholder="Password..."
                type="password"
                value={pwd}
                {...register("password", {
                  onChange: (e) => {
                    setPwd(e.target.value);
                  },
                })}
              />
            </FormGroup>
            <FormGroup>
              <Label for="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword " 
                name="confirmPassword"
                placeholder="Confirm Password..."
                 type="password" value={confirmPassword}
                 {...register("confirmPassword", {
                  onChange: (e) => {
                    setConfirmPassword(e.target.value);
                  },
                })}
              />
            </FormGroup>
            <FormGroup>
              <Label for="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                placeholder="First Name..."
                type="text"
                value={firstName}
                {...register("firstName", {
                  onChange: (e) => {
                    setfirstName(e.target.value);
                  },
                })}
              />
            </FormGroup>
            <FormGroup>
              <Label for="lastName">last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                placeholder="last Name..."
                type="text"
                value={lastName}
                {...register("lastName", {
                  onChange: (e) => {
                    setlastName(e.target.value);
                  },
                })}
              />
            </FormGroup>
            <FormGroup>
              <Label for="phone">phone</Label>
              <Input
                id="phone"
                name="phone"
                placeholder="phone..."
                type="tel"
                value={phone}
                {...register("phone", {
                  onChange: (e) => {
                    setphone(e.target.value);
                  },
                })}
              />
            </FormGroup>
            <FormGroup>
              <Label for="country">country</Label>
              <Input
                id="country"
                name="country"
                placeholder="country..."
                type="text"
                value={country}
                {...register("country", {
                  onChange: (e) => {
                    setcountry(e.target.value);
                  },
                })}
              />
            </FormGroup>
            <FormGroup>
              <Button color="primary" className="button" type="submit">
                Update Profile
              </Button>
            </FormGroup>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
