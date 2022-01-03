import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import userServices from '../../services/user'

const User = () => {
  const { id } = useParams()

  const [user, setUser] = useState()

  useEffect(async () => {
    const data = await userServices.getById(id)
    setUser(data)
  }, [])

  if (!user) return null

  return (
      <div>
        <h2>{user.username}</h2>
        <h3>Added Blogs</h3>
        {
          user.blogs.length === 0
            ? <p>User has no blogs posted</p>
            : (<ul>
                {user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
              </ul>)
        }
      </div>
  )
}

export default User
