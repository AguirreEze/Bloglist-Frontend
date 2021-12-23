import axios from 'axios'
const baseUrl = '/api/blogs'

const getToken = () => {
  const user = JSON.parse(window.localStorage.getItem('BloglistUser'))
  return `Bearer ${user.token}`
}

const getConfig = () => {
  const token = getToken()
  return ({
    headers: {
      Authorization: token
    }
  })
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createNewBlog = (data) => {
  const config = getConfig()
  const request = axios.post(baseUrl, data, config)
  return request.then(res => res.data)
}

const likeBlog = (blog) => {
  const config = getConfig()

  const req = axios.put(`${baseUrl}/${blog.id}`, blog, config)
  return req.then(res => res.data)
}

export default { getAll, createNewBlog, likeBlog }
