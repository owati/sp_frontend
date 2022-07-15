import { createSlice } from "@reduxjs/toolkit";

export const cartSlicer = createSlice(
    {
        name : "cart",
        initialState : {
            items : []
        },

        reducers : {
            updateItem : (state, action) => {
                state.items = [
                    ...action.payload
                ]
            }
        }
    }
)


export const {updateItem} = cartSlicer.actions;

export default cartSlicer.reducer