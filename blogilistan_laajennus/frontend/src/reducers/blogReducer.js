import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    addBlog(state, action) {
      const content = action.payload
      state.push({ content })
    },
    setAllBlogs(state, action) {
      const content = action.payload
      console.log('content', content)

      return content
    }
  }
})

export const { addBlog, setAllBlogs } = blogSlice.actions
export default blogSlice.reducer
