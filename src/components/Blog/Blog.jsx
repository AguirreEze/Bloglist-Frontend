import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from '../../reducers/notificationReducer'
import blogService from '../../services/blogs'
import DeleteBlog from '../DeleteBlog'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

const Blog = ({ blog }) => {
  const { title, author, url, likes, user, id } = blog

  const dispatch = useDispatch()

  const [deleted, setDeleted] = useState(false)
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
      dispatch(setNotification(`Liked ${title}, from ${author}`, 'ok'))
    } catch ({ response }) { dispatch(setNotification(response.data.error, 'error')) }
  }

  const toggleShow = () => setShow(!show)

  if (deleted) return null

  return (
    show
      ? (
        <div style={blogStyle}>
          <div>
            <span>{title}</span>
            <button onClick={toggleShow}>hide</button>
          </div>
          <div className='url'>
           <span>{url}</span>
          </div>
          <div>
           <span className='likes'>likes: {showLikes}</span>
           <button onClick={handleLike}>like</button>
          </div>
          <div>
            <span>{author}</span>
          </div>
          <DeleteBlog
          userId={user.id}
          blog={blog}
          setDeleted={setDeleted}
          />
        </div>
        )
      : (
      <div>
        <span>{title}</span>
        <span>{author}</span>
        <button onClick={toggleShow}>view</button>
      </div>
        )
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired
}

export default Blog
