import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

let config = {}

const setToken = newToken => {
  token = `bearer ${newToken}`
  config = {
    headers: { Authorization: token },
  }
}

const getAll = () => {
  return axios.get(baseUrl, config).then(response => response.data)
}

const create = newObject => {
  return axios.post(baseUrl, newObject, config).then(response => response.data)
}

const update = (id, newObject) => {
  return axios.put(`${ baseUrl }/${id}`, newObject, config).then(response => response.data)
}

const remove = (id) => {
  return axios.delete(`${ baseUrl }/${id}`, config).then(response => response.data)
}



export const blogService = { setToken, getAll, create, update, remove }