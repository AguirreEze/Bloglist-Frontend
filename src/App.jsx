import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import CreateNewBlog from './components/CreateNewBlog'
import Notification from './components/Notification/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const hideForm = useRef()

  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('ok')
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('BloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const showNotification = (detail, type) => {
    setMessage(detail)
    setMessageType(type)
    setTimeout(() => setMessage(null), 5000)
  }
  const handleLogout = () => {
    window.localStorage.removeItem('BloglistUser')
    setUser(null)
  }

  return (
    <>
      <Notification text={message} type={messageType}/>
      {user
        ? (
          <div>
            <h2>blogs</h2>
            <span>{`Logged as ${user.username}`}</span>
            <button onClick={handleLogout}>Logout</button>
            <Togglable buttonLabel="Add a Blog" ref={hideForm}>
              <CreateNewBlog notification={showNotification} hide={hideForm} />
            </Togglable>
            {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} notification={showNotification} />
            )}
          </div>)
        : (
          <>
            <Login setUser={setUser} notification={showNotification}/>
          </>
          )
        }

    </>
  )
}

export default App
