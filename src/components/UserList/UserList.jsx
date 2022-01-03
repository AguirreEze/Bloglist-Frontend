import React, { useEffect, useState } from 'react'
import userServices from '../../services/user'

const UserList = () => {
  const [users, setUsers] = useState([])
  useEffect(async () => {
    setUsers(await userServices.getAll())
  }, [])
  return (
      <section>
          <h2>Users</h2>
        <table>
            <thead>
                <tr>
                    <th>User</th>
                    <th>Blogs created</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map(user => {
                      return (
                            <tr key={user.id}>
                                <td>{user.username}</td>
                                <td>{user.blogs.length}</td>
                            </tr>
                      )
                    })
                }
            </tbody>
        </table>
      </section>
  )
}

export default UserList
