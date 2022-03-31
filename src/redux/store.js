import { configureStore } from "@reduxjs/toolkit";
import userSlicer from "./slicers/userSlicer";


const initialState = {};

const store = configureStore({
    reducer : {
        user : userSlicer
    }
})


export default store;