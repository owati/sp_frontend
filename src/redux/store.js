import { configureStore } from "@reduxjs/toolkit";
import userSlicer from "./slicers/userSlicer";
import cartSlicer from "./slicers/cartSlicer";
import loadSlicer from "./slicers/loadSlicer";



const store = configureStore({
    reducer : {
        user : userSlicer,
        cart : cartSlicer,
        load : loadSlicer
    }
})


export default store;