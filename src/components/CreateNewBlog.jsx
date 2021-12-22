import React, { useState } from 'react'
import blog from '../services/blogs'

const CreateNewBlog = ({ notification, hide }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {
      title,
      author,
      url
    }
    try {
      await blog.createNewBlog(data)
      notification(`New blog: "${data.title}" added`, 'ok')

      setTitle('')
      setAuthor('')
      setUrl('')
      hide.current.toggleVisibility()
    } catch ({ response }) { notification(response.data.error, 'error') }
  }

  return (
        <form onSubmit={handleSubmit}>
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

export default CreateNewBlog
