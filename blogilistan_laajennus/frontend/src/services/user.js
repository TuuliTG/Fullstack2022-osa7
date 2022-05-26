import axios from 'axios'
let token = null

const STORAGE_KEY = 'loggedBlogAppUser'

const baseUrl = '/api/users'

const setUser = (user) => {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
  token = user.token
}

const getUser = () => {
  const loggedUserJSON = window.localStorage.getItem(STORAGE_KEY)
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    token = user.token
    return user
  }

  return null
}

const clearUser = () => {
  localStorage.clear()
  token = null
}

const getAllUsers = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const getUserById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const getToken = () => token

export default {
  setUser,
  getUser,
  clearUser,
  getToken,
  getAllUsers,
  getUserById
}
