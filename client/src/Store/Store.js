import {configureStore} from "@reduxjs/toolkit";
import { customerReducer } from "../Features/Customer";
import postReducer from "../Features/PostSlice";
export const Store=configureStore({
    reducer:{
        customers: customerReducer,
        posts: postReducer,

    },
});