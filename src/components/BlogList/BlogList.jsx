import React, { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import CreateNewBlog from '../CreateNewBlog'
import { setLogout } from '../../reducers/userReducer'
import Togglable from '../Togglable'
import Blog from '../Blog'

const BlogList = () => {
  const hideForm = useRef()
  const blogs = useSelector(store => store.blogs)
  const user = useSelector(store => store.user)
  const dispatch = useDispatch()

  const handleLogout = () => {
    window.localStorage.removeItem('BloglistUser')
    dispatch(setLogout())
  }
  return (
    <div>
        <h2>blogs</h2>
        <span>{`Logged as ${user.username}`}</span>
        <button onClick={handleLogout}>Logout</button>
        <Togglable buttonLabel="Add a Blog" ref={hideForm}>
            <CreateNewBlog hide={hideForm} />
        </Togglable>
        <div data-test-id={'blog-list-display'}>
        {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} />
        )}
        </div>
    </div>)
}

export default BlogList
