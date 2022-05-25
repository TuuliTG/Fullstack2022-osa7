import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: null,
  type: null
}
const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotificationMessage(state, action) {
      const message = action.payload.message
      const type = action.payload.type
      const newState = {
        message: message,
        type: type
      }
      return newState
    },
    resetNotification(state, action) {
      return initialState
    }
  }
})

export const { setNotificationMessage, resetNotification } = notificationSlice.actions
export default notificationSlice.reducer
