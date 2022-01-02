import blogService from '../services/blogs'

export const blogReducer = (state = [], action) => {
  if (action.type === '@blogs/getall') {
    return action.payload
  }
  return state
}

export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: '@blogs/getall',
      payload: blogs
    })
  }
}
