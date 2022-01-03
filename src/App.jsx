import React, { useEffect } from 'react'
import Login from './components/Login'
import Notification from './components/Notification/Notification'
import { setLogin } from './reducers/userReducer'
import { useSelector, useDispatch } from 'react-redux'
import { initBlogs } from './reducers/blogsReducer'
import BlogList from './components/BlogList/BlogList'

const App = () => {
  const user = useSelector(store => store.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initBlogs())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('BloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setLogin(user))
    }
  }, [])

  return (
    <>
      <Notification/>
      {user
        ? <BlogList />
        : (
            <Login/>
          )
        }

    </>
  )
}

export default App
