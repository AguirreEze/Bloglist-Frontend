import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'

test('Initial component renders Blogs title and author, but dosent render url and likes', () => {
  const blog = {
    title: 'Testing React',
    author: 'Ezequiel',
    url: 'https://www.google.com',
    likes: 1,
    user: 'Tydrok',
    id: 3256481354
  }

  const component = render(<Blog blog={blog} />)

  component.getByText(blog.title)
  component.getByText(blog.author)
  const likes = component.queryByText('likes')
  expect(likes).toBe(null)
  const url = component.queryByText(blog.url)
  expect(url).toBe(null)
})
