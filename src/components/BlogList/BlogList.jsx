import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import CreateNewBlog from '../CreateNewBlog'
import { initBlogs } from '../../reducers/blogsReducer'
import Togglable from '../Togglable'
import Blog from '../Blog/Blog'

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
        <div data-test-id={'blog-list-display'}>
        {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} />
        )}
        </div>
    </section>)
}

export default BlogList
