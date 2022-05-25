import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser(state, action) {
      return action.payload
    },
    logoutUser(state, action) {
      return initialState
    },
    setLoggedUser(state, action) {
      return action.payload
    }
  }
})

export const { loginUser, logoutUser, setLoggedUser } = userSlice.actions
export default userSlice.reducer
