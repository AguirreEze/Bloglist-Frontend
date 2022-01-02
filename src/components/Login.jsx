import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { setLogin } from '../reducers/userReducer'
import login from '../services/login'

const Login = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    const user = {
      username,
      password
    }
    try {
      const data = await login.getToken(user)
      dispatch(setLogin(data))
      window.localStorage.setItem('BloglistUser', JSON.stringify(data))
      dispatch(setNotification(`Welcome ${data.username}`, 'ok'))
    } catch ({ response }) {
      dispatch(setNotification(response.data.error, 'error'))
    }
  }

  return (
    (<form onSubmit={handleLogin}>
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

  )
}

export default Login
