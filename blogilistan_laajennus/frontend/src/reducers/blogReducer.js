import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    addBlog(state, action) {
      const { author, id, likes, title, url, user } = action.payload
      state.push({ author: author, id: id, likes: likes, title: title, url: url, user: user })
    },
    setAllBlogs(state, action) {
      const content = action.payload
      return content
    }
  }
})

export const { addBlog, setAllBlogs } = blogSlice.actions
export default blogSlice.reducer
