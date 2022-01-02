import propTypes from 'prop-types'
import React, { useState } from 'react'
import blog from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const CreateNewBlog = ({ hide }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {
      title,
      author,
      url
    }
    try {
      await blog.createNewBlog(data)
      dispatch(setNotification(`New blog: "${data.title}" added`, 'ok'))

      setTitle('')
      setAuthor('')
      setUrl('')
      hide.current.toggleVisibility()
    } catch ({ response }) { dispatch(setNotification(response.data.error, 'error')) }
  }

  return (
        <form
        onSubmit={handleSubmit}
        data-test-id={'create-new-blog-form'}
        >
            <h2>Create new blog</h2>
            <div>
              <label>Title:</label>
              <input
              type='text'
              value={title}
              name='Title'
              placeholder='Title'
              onChange={(e) => setTitle(e.target.value)}
               />
            </div>
            <div>
                <label>Author:</label>
                <input
                type='text'
                value={author}
                name='Author'
                placeholder='Author'
                onChange={(e) => setAuthor(e.target.value)}
                />
            </div>
            <div>
                <label>url:</label>
                <input
                type='text'
                value={url}
                name='Url'
                placeholder='Url'
                onChange={(e) => setUrl(e.target.value)}
                />
            </div>
            <button>Create</button>
        </form>
  )
}

CreateNewBlog.propTypes = {
  hide: propTypes.object
}

export default CreateNewBlog
