import axios from 'axios'
const baseUrl = '/api/blogs'

const getToken = () => {
  const user = JSON.parse(window.localStorage.getItem('BloglistUser'))
  return `Bearer ${user.token}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createNewBlog = (data) => {
  const token = getToken()
  const config = {
    headers: {
      Authorization: token
    }
  }
  const request = axios.post(baseUrl, data, config)
  return request.then(res => res.data)
}

export default { getAll, createNewBlog }
