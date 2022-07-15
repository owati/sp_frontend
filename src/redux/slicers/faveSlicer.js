import { createSlice } from "@reduxjs/toolkit";

export const faveSlicer = createSlice(
    {
        name : "faves",
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


export const {updateItem} = faveSlicer.actions;

export default faveSlicer.reducer