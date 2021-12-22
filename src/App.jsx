import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import CreateNewBlog from './components/CreateNewBlog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [logged, setLogged] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
    if (window.localStorage.getItem('BloglistUser') !== null) setLogged(true)
  }, [])

  return (
    <>
      <Login logged={setLogged}/>

      {logged
        ? (
          <div>
          <CreateNewBlog />
      <h2>blogs</h2>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>)
        : null}

    </>
  )
}

export default App
