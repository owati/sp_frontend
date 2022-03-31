import { createSlice } from '@reduxjs/toolkit'

export const userSlicer = createSlice({
  name: 'user',
  initialState: {
    info: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.info = {
          ...action.payload
      }
    },
    remUser: (state) => {
      state.info = null
    },
  },
})


export const { setUser, remUser } = userSlicer.actions

export default userSlicer.reducer