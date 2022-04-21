import { createSlice } from "@reduxjs/toolkit";

export const cartSlicer = createSlice(
    {
        name : "cart",
        initialState : {
            items : []
        },

        reducers : {
            addItem : (state, action) => {
                state.items = [
                    ...state.items,
                    action.payload
                ]

                console.log(state.items)
            }
        }
    }
)


export const {addItem} = cartSlicer.actions;

export default cartSlicer.reducer