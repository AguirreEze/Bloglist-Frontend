import React, { useState } from 'react'
import blog from '../services/blogs'

const CreateNewBlog = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      title,
      author,
      url
    }
    try {
      blog.createNewBlog(data)
    } catch (err) { console.log(err) }
  }

  return (
        <form>
            <h2>Create new blog</h2>
            <div>
              <label>Title:</label>
              <input type={'text'} onChange={(e) => setTitle(e.target.value)}/>
            </div>
            <div>
                <label>Author:</label>
                <input type={'text'} onChange={(e) => setAuthor(e.target.value)}/>
            </div>
            <div>
                <label>url:</label>
                <input type={'text'} onChange={(e) => setUrl(e.target.value)}/>
            </div>
            <button onClick={handleSubmit}>Create</button>
        </form>
  )
}

export default CreateNewBlog
