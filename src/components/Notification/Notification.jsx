import React from 'react'
import { ok, error } from './notification.module.css'

const Notification = ({ text, type }) => {
  return (
    text !== null
      ? <div
      className={
        type === 'ok'
          ? ok
          : error
      }
      >{text}</div>
      : null
  )
}

export default Notification
