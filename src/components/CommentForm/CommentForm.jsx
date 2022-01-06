import React from 'react'
import { useDispatch } from 'react-redux'
import { useField } from '../../hooks'
import { setNotification } from '../../reducers/notificationReducer'
import blogServices from '../../services/blogs'

const CommentForm = ({ id }) => {
  const dispatch = useDispatch()
  const comment = useField({ type: 'text' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await blogServices.commentBlog(comment.value, id)
      e.target.comment.value = ''
      dispatch(setNotification('Commented This Blog', 'ok'))
    } catch ({ response }) { setNotification(response.data.error, 'error') }
  }
  return (
      <form onSubmit={handleSubmit}>
          <input
          {...comment}
          name='comment'
          placeholder='Comment'
          />
          <button>add comment</button>
      </form>
  )
}
export default CommentForm
