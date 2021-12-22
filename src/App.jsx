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
  const [logged, setLogged] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
    if (window.localStorage.getItem('BloglistUser') !== null) setLogged(true)
  }, [])
  const showNotification = (detail, type) => {
    setMessage(detail)
    setMessageType(type)
    setTimeout(() => setMessage(null), 5000)
  }

  return (
    <>
      <h2>blogs</h2>
      <Notification text={message} type={messageType}/>

      <Login logged={setLogged} notification={showNotification}/>

      {logged
        ? (
          <div>
          <CreateNewBlog notification={showNotification}/>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>)
        : null}

    </>
  )
}

export default App
