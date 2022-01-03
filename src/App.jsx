import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Notification from './components/Notification/Notification'
import { setLogin, setLogout } from './reducers/userReducer'
import { useSelector, useDispatch } from 'react-redux'
import BlogList from './components/BlogList/BlogList'
import UserList from './components/UserList/UserList'
import User from './components/User/User'

const App = () => {
  const user = useSelector(store => store.user)
  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('BloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setLogin(user))
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('BloglistUser')
    dispatch(setLogout())
  }

  return (
    <>
      <Notification/>
      {user
        ? (
            <>
              <header>
                <h1>blogs app</h1>
                <span>{`Logged as ${user.username}`}</span>
                <button onClick={handleLogout}>Logout</button>
              </header>
              <Routes>
                <Route path='/users/:id' element={<User/>} />
                <Route path='/users' element={<UserList />} />
                <Route path='/' element={<BlogList />} />
              </Routes>
            </>
          )
        : (
            <Login/>
          )
        }

    </>
  )
}

export default App
