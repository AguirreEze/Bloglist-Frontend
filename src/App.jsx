import React, { useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import CreateNewBlog from './components/CreateNewBlog'
import Notification from './components/Notification/Notification'
import Togglable from './components/Togglable'
import { setLogin, setLogout } from './reducers/userReducer'
import { useSelector, useDispatch } from 'react-redux'
import { initBlogs } from './reducers/blogsReducer'

const App = () => {
  const hideForm = useRef()

  const user = useSelector(store => store.user)
  const blogs = useSelector(store => store.blogs)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initBlogs())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('BloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setLogin(user))
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('BloglistUser')
    dispatch(setLogout())
  }

  return (
    <>
      <Notification/>
      {user
        ? (
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
        : (
          <>
            <Login/>
          </>
          )
        }

    </>
  )
}

export default App
