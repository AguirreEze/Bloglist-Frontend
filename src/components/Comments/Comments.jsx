import React from 'react'
import PropTypes from 'prop-types'

const Comments = ({ comments }) => {
  if (comments.length === 0) {
    return (
        <>
        <h2>Comments</h2>
        <p>No comments yet</p>
        </>
    )
  }
  return (
    <div>
      <h2>Comments</h2>
      {
        comments.length === 0
          ? (
            <>
              <p>No comments yet</p>
            </>
            )
          : (
            <ul>
            {
              comments.map(comment => <li key={comment}>{comment}</li>)
            }
            </ul>
            )
      }

    </div>
  )
}

Comments.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.string)
}

export default Comments
