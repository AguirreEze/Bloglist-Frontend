import React, { useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Login from './components/Login'
import Notification from './components/Notification/Notification'
import { setLogin, setLogout } from './reducers/userReducer'
import { useSelector, useDispatch } from 'react-redux'
import BlogList from './components/BlogList/BlogList'
import UserList from './components/UserList/UserList'
import User from './components/User/User'
import Blog from './components/Blog/Blog'

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
      {user
        ? (
          <>
              <header>
                <Link to={'/'} >Blogs</Link>
                <Link to={'/users'} >Users</Link>
                <span>{`Logged as ${user.username}`}</span>
                <button onClick={handleLogout}>Logout</button>
              </header>
              <Notification/>
              <h1>blogs app</h1>
              <Routes>
                <Route path='/users/:id' element={<User/>} />
                <Route path='/blogs/:id' element={<Blog/>} />
                <Route path='/users' element={<UserList />} />
                <Route path='/' element={<BlogList />} />
              </Routes>
            </>
          )
        : (
            <>
              <Notification/>
              <Login/>
            </>
          )
        }

    </>
  )
}

export default App
