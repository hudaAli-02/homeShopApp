import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    customer: {},
    isLoading: false,
    isSuccess: false,
    isError: false,
  };

  export const registerCustomer = createAsyncThunk("customers/registerCustomer",
    async(CustomerData)=>{
        try{
            const response = await axios.post("http://localhost:3001/registerCustomer",{
              username: CustomerData.username,
              email: CustomerData.email,
              password: CustomerData.password,
              firstName: CustomerData.firstName,
              lastName: CustomerData.lastName,
              phone: CustomerData.phone,
              country: CustomerData.country,
            });
            console.log(response);
            const customer= response.data.customer;
            return customer;

        }catch(error){
            console.log(error);
        }
    });

    export const login = createAsyncThunk("customers/login", async (CustomerData) => {
      try{
          const response = await axios.post("http://localhost:3001/login", {
            email: CustomerData.email,
            password: CustomerData.password,
          });
          const customer= response.data.customer;
          console.log(response);
          return customer;
      }catch(error) {
          const errorMessage = "Invalid credentials";
          alert(errorMessage);
          throw new Error(errorMessage);
      }
  });

  
  export const logout = createAsyncThunk("/customers/logout", async() => {
    try{
        const response = await axios.post("http://localhost:3001/logout");
    }catch(error){}
  });


  export const updateCustomerProfile = createAsyncThunk(
    "customers/updateCustomerProfile", 
    async (CustomerData) => {
      try {
      
        const response = await axios.put(
          `http://localhost:3001/updateCustomerProfile/${CustomerData.email}`,
          {
            username: CustomerData.username,
            email: CustomerData.email,
            password: CustomerData.password,
            country: CustomerData.country,
            phone: CustomerData.phone,
            firstName: CustomerData.firstName,
            lastName: CustomerData.lastName,
            profilePic: CustomerData.profilePic,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
  
        const customer = response.data.customer;
  
        return customer;
      } catch (error) {
        console.log(error);
      }
    });
  

export const customerSlice= createSlice({
    name: "customers",
    initialState,
    reducers: {
        addCustomer: (state, action )=>{
          state.value.push(action.payload);
        },
        deleteCustomer: (state, action)=>{
            state.value=state.value.filter((customer)=>customer.email!==action.payload);
        },
        updateCustomer:(state, action)=>{
            state.value.map((customer)=>{
                if(customer.email===action.payload.email)
                {
                    customer.username= action.payload.usernamename;
                    customer.password=action.payload.password;
                    customer.country=action.payload.country;
                    customer.phone=action.payload.phone;
                    customer.firstName=action.payload.firstName;
                    customer.lastName=action.payload.lastName;
                }
            });
        },
    },
    extraReducers: (builder) => {
        builder
          .addCase(registerCustomer.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(registerCustomer.fulfilled, (state, action) => {
            state.isLoading = true;
          })
          .addCase(registerCustomer.rejected, (state) => {
            state.isLoading = false;
          })
          .addCase(login.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(login.fulfilled, (state, action) => {
            state.customer = action.payload;
            state.isLoading = false;
            state.isSuccess = true;
          })
          .addCase(login.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
          })
          .addCase(logout.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(logout.fulfilled, (state) => {
            state.customer = {};
            state.isLoading = false;
            state.isSuccess = false;
          })
          .addCase(logout.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
          })
          .addCase(updateCustomerProfile.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(updateCustomerProfile.fulfilled, (state, action) => {
            state.customer = action.payload;
            state.isLoading = false;
          })
          .addCase(updateCustomerProfile.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
          })
          
        }
      });
        
export const {addCustomer, deleteCustomer, updateCustomer}= customerSlice.actions;
export const customerReducer=customerSlice.reducer;
export default customerSlice.reducer;