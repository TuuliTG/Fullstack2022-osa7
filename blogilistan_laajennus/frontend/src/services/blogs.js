import axios from 'axios'
import userService from './user'

const baseUrl = '/api/blogs'

const config = (token) => {
  return {
    headers: {
      Authorization: `bearer ${token}`
    }
  }
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const getById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const create = async (newObject, token) => {
  const response = await axios.post(baseUrl, newObject, config(token))
  return response.data
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then((response) => response.data)
}

const remove = (id, token) => {
  return axios.delete(`${baseUrl}/${id}`, config(token))
}

export default { getAll, create, update, remove, getById }
