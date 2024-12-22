import * as yup from "yup";
export const CustomerSchemaValidation = yup.object().shape({
    username: yup.string().required("UserName is required."),
    email: yup.string().email("Not valid email format").required("Email is required"),
    password: yup.string().min(4).max(20).required("password is reqiured"),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null], "password Dont Match ").required(),
    country: yup.string().required("country is required."),
    phone: yup.string().min(8).max(8).required("phone number is required. "),
    firstName: yup.string().required("First Name is required."),
    lastName: yup.string().required("Last Name is required."),


});