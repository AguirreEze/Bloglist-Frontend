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

const getById = async (id) => {
  const { data } = await axios.get(`${baseUrl}/${id}`)
  return data
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

const deleteBlog = (id) => {
  const config = getConfig()
  const req = axios.delete(`${baseUrl}/${id}`, config)
  return req.then(res => res.data)
}

const commentBlog = (comment, id) => {
  const req = axios.post(`${baseUrl}/${id}/comment`, { comment })
  return req.then(res => res.data)
}

export default { getAll, createNewBlog, likeBlog, deleteBlog, getById, commentBlog }
