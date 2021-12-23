import React from 'react'
import blogServices from '../services/blogs'
import PropTypes from 'prop-types'

const DeleteBlog = ({ userId, blog, notification, setDeleted }) => {
  const { title, author, id } = blog
  const loggedId = JSON.parse(window.localStorage.getItem('BloglistUser')).id

  const handleDelete = async () => {
    if (window.confirm(`Remove Blog: ${title}, by ${author}`)) {
      try {
        blogServices.deleteBlog(id)
        notification(`Deleted ${title}, by ${author}`, 'ok')
        setDeleted(true)
      } catch ({ response }) { notification(response.data.error, 'error') }
    }
  }

  return (
    loggedId === userId
      ? <button onClick={handleDelete}>delete</button>
      : null
  )
}

DeleteBlog.propTypes = {
  userId: PropTypes.string.isRequired,
  blog: PropTypes.object.isRequired,
  notification: PropTypes.func.isRequired,
  setDeleted: PropTypes.func.isRequired
}

export default DeleteBlog
