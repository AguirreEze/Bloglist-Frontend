import propTypes from 'prop-types'
import React from 'react'
import { ok, error } from './notification.module.css'

const Notification = ({ text, type = 'ok' }) => {
  return (
    text !== null
      ? <div
      className={
        type === 'ok'
          ? ok
          : error
      }
      data-test-id={'notifications'}
      >{text}</div>
      : null
  )
}

Notification.propTypes = {
  text: propTypes.string,
  type: propTypes.string
}

export default Notification
