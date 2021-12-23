import React, { useState } from 'react'
import blogService from '../services/blogs'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

const Blog = ({ blog, notification }) => {
  const { title, author, url, likes, user, id } = blog

  const [show, setShow] = useState(false)
  const [showLikes, setShowLikes] = useState(likes)

  const handleLike = async () => {
    const likedBlog = {
      title,
      author,
      url,
      likes: showLikes + 1,
      user,
      id
    }
    try {
      await blogService.likeBlog(likedBlog)
      setShowLikes(showLikes + 1)
      notification(`Liked ${title}, from ${author}`, 'ok')
    } catch ({ response }) { notification(response.data.error, 'error') }
  }

  const toggleShow = () => setShow(!show)
  return (
    show
      ? (
        <div style={blogStyle}>
          <div>
            <span>{title}</span>
            <button onClick={toggleShow}>hide</button>
          </div>
          <div>
           <span>{url}</span>
          </div>
          <div>
           <span>likes: {showLikes}</span>
           <button onClick={handleLike}>like</button>
          </div>
          <div>
            <span>{author}</span>
          </div>
        </div>
        )
      : (
      <div>
        <span>{title}</span>
        <button onClick={toggleShow}>view</button>
      </div>
        )
  )
}

export default Blog
