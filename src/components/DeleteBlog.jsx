import React from 'react'
import blogServices from '../services/blogs'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const DeleteBlog = ({ userId, blog, setDeleted }) => {
  const dispatch = useDispatch()

  const { title, author, id } = blog
  const loggedId = JSON.parse(window.localStorage.getItem('BloglistUser')).id

  const handleDelete = async () => {
    if (window.confirm(`Remove Blog: ${title}, by ${author}`)) {
      try {
        blogServices.deleteBlog(id)
        dispatch(setNotification(`Deleted ${title}, by ${author}`, 'ok'))
        setDeleted(true)
      } catch ({ response }) { dispatch(setNotification(response.data.error, 'error')) }
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
  setDeleted: PropTypes.func.isRequired
}

export default DeleteBlog
