import { configureStore } from "@reduxjs/toolkit";
import userSlicer from "./slicers/userSlicer";
import cartSlicer from "./slicers/cartSlicer";
import loadSlicer from "./slicers/loadSlicer";
import faveSlicer from "./slicers/faveSlicer"



const store = configureStore({
    reducer : {
        user : userSlicer,
        cart : cartSlicer,
        load : loadSlicer,
        fave : faveSlicer
    }
})


export default store;