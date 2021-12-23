import React, { useState } from 'react'
const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

const Blog = ({ blog }) => {
  const [show, setShow] = useState(false)

  const toggleShow = () => setShow(!show)
  return (
    show
      ? (
        <div style={blogStyle}>
          <div>
            <span>{blog.title}</span>
            <button onClick={toggleShow}>hide</button>
          </div>
          <div>
           <span>{blog.url}</span>
          </div>
          <div>
           <span>likes: {blog.likes}</span>
          </div>
          <div>
            <span>{blog.author}</span>
          </div>
        </div>
        )
      : (
      <div>
        <span>{blog.title}</span>
        <button onClick={toggleShow}>view</button>
      </div>
        )
  )
}

export default Blog
