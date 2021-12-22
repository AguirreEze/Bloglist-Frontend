import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createNewBlog = (data) => {
  const { token } = JSON.parse(window.localStorage.getItem('BloglistUser'))
  const request = axios.post(
    baseUrl,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  return request.then(res => res.data)
}

export default { getAll, createNewBlog }
