import React, { useState } from 'react'
import login from '../services/login'

const Login = ({ logged }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const handleLogin = async (e) => {
    e.preventDefault()
    const user = {
      username,
      password
    }
    try {
      const data = await login.getToken(user)
      setUser(data)
      logged(true)
    } catch (err) {
      console.log('Wrong credentials')
    }
  }
  return (
    user === null
      ? (<form>
            <h1>Login to the application</h1>
            <div>
            <label >Username</label>
            <input type={'text'} onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <div>
            <label>Password</label>
            <input type={'password'} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button onClick={handleLogin}>login</button>
        </form>)
      : <span>{`Logged as ${user.username}`}</span>
  )
}

export default Login
