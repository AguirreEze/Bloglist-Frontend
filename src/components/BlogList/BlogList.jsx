import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import CreateNewBlog from '../CreateNewBlog'
import { initBlogs } from '../../reducers/blogsReducer'
import Togglable from '../Togglable'
import { Link } from 'react-router-dom'

const BlogList = () => {
  const hideForm = useRef()
  const blogs = useSelector(store => store.blogs)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initBlogs())
  }, [])

  return (
    <section>
        <Togglable buttonLabel="Add a Blog" ref={hideForm}>
            <CreateNewBlog hide={hideForm} />
        </Togglable>
        <ul data-test-id={'blog-list-display'}>
        {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <li key={blog.id}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></li>
        )}
        </ul>
    </section>)
}

export default BlogList
