import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import CreateNewBlog from './components/CreateNewBlog'
import Notification from './components/Notification/Notification'

const App = () => {
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('ok')
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(JSON.parse(window.localStorage.getItem('BloglistUser')))

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])
  const showNotification = (detail, type) => {
    setMessage(detail)
    setMessageType(type)
    setTimeout(() => setMessage(null), 5000)
  }
  const handleLogout = () => {
    window.localStorage.clear()
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
            <CreateNewBlog notification={showNotification}/>
            {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
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
