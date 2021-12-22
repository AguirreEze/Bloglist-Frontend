import React, { useEffect, useState } from 'react'
import login from '../services/login'

const Login = ({ logged, notification }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    setUser(JSON.parse(window.localStorage.getItem('BloglistUser')))
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    const user = {
      username,
      password
    }
    try {
      const data = await login.getToken(user)
      setUser(data)
      window.localStorage.setItem('BloglistUser', JSON.stringify(data))
      logged(true)
      notification('Welcome', 'ok')
    } catch ({ response }) {
      notification(response.data.error, 'error')
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
    logged(false)
  }
  return (
    user === null
      ? (<form onSubmit={handleLogin}>
            <h1>Login to the application</h1>
            <div>
              <label name="Username">Username</label>
              <input
              type={'text'}
              value={username}
              name='Username'
              placeholder='Username'
              onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label name="Password">Password</label>
              <input
              type={'password'}
              value={password}
              name='Password'
              placeholder='Password'
              onChange={(e) => setPassword(e.target.value)}
              />
            </div>
              <button>login</button>
        </form>)
      : (
          <>
             <span>{`Logged as ${user.username}`}</span>
             <button onClick={handleLogout}>Logout</button>
          </>
        )
  )
}

export default Login
