import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import { setNotification } from '../../reducers/notificationReducer'
import blogService from '../../services/blogs'
import DeleteBlog from '../DeleteBlog'
import Comments from '../Comments/Comments'

const Blog = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const [blog, setBlog] = useState()
  const [deleted, setDeleted] = useState(false)

  useEffect(async () => {
    const data = await blogService.getById(id)
    setBlog(data)
  }, [])

  const handleLike = async () => {
    const likedBlog = { ...blog, likes: blog.likes + 1 }
    try {
      await blogService.likeBlog(likedBlog)
      setBlog(likedBlog)
      dispatch(setNotification(`Liked ${blog.title}, from ${blog.author}`, 'ok'))
    } catch ({ response }) { dispatch(setNotification(response.data.error, 'error')) }
  }

  if (deleted) return <strong>Blog Deleted</strong>
  if (!blog) return null

  return (
    <article>
      <h2>{blog.title}</h2>
      <a href='#'>{blog.url}</a>
      <div>
        <span className='likes'>likes: {blog.likes}</span>
        <button onClick={handleLike}>like</button>
      </div>
      <p>Added by {blog.author}</p>
      <DeleteBlog
        userId={blog.user.id}
        blog={blog}
        setDeleted={setDeleted}
      />
      <Comments comments={blog.comments} />
    </article>
  )
}

export default Blog
