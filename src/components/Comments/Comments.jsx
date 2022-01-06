import React from 'react'
import PropTypes from 'prop-types'
import CommentForm from '../CommentForm/CommentForm'

const Comments = ({ comments, id }) => {
  return (
    <div>
      <h2>Comments</h2>
      <CommentForm id={id}/>
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
