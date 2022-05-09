import { createSlice } from "@reduxjs/toolkit";

const loadSlicer = createSlice({
    name : "load",
    initialState : false,
    reducers : {
        toggle : (state, action) => {
            state = action.payload
        }
    }
})

export const {toggle} = loadSlicer.actions;

export default loadSlicer.reducer;