import React from 'react'
import blogServices from '../services/blogs'

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

export default DeleteBlog
