import { configureStore } from "@reduxjs/toolkit";
import userSlicer from "./slicers/userSlicer";
import cartSlicer from "./slicers/cartSlicer";



const store = configureStore({
    reducer : {
        user : userSlicer,
        cart : cartSlicer
    }
})


export default store;