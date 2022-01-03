import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'

const blog = {
  title: 'Testing React',
  author: 'Ezequiel',
  url: 'https://www.google.com',
  likes: 1,
  user: 'Tydrok',
  id: 3256481354
}
let component

describe('<Blog /> tests', () => {
  beforeEach(() => {
    component = render(<Blog blog={blog} />)
  })

  test('Initial component renders Blogs title and author, but dosent render url and likes', () => {
    component.getByText(blog.title)
    component.getByText(blog.author)
    const likes = component.queryByText(`likes: ${blog.likes}`)
    expect(likes).toBe(null)
    const url = component.queryByText(blog.url)
    expect(url).toBe(null)
  })

  test.skip('When unfolding Blog shows url and Likes', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    component.getByText(blog.url)
    component.getByText(`likes: ${blog.likes}`)
  })
})
