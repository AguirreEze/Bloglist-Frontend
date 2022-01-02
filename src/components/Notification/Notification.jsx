import propTypes from 'prop-types'
import React from 'react'
import { useSelector } from 'react-redux'
import { ok, error } from './notification.module.css'

const Notification = () => {
  const notification = useSelector(store => store.notification)

  return (
    notification.text !== ''
      ? <div
      className={
        notification.type === 'ok'
          ? ok
          : error
      }
      data-test-id={'notifications'}
      >{notification.text}</div>
      : null
  )
}

Notification.propTypes = {
  text: propTypes.string,
  type: propTypes.string
}

export default Notification
