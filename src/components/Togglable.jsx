import React, { useState, useImperativeHandle, forwardRef } from 'react'

const Togglable = forwardRef(({ children, buttonLabel }, ref) => {
  const [visible, setVisible] = useState(false)

  //   const hideWhenVisible = { display: visible ? '' : 'none' }
  //   const showWhenVisible = { display: visible ? 'none' : '' }
  const toggleVisibility = () => setVisible(!visible)

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
  // <div>
  //     <div style={hideWhenVisible}>
  //         {children}
  //     </div>
  //     <div style={showWhenVisible}>
  //         <button onClick={() => setVisible(!visible)} >Add a Blog</button>
  //     </div>
  // </div>

    visible
      ? (
          <>
            { children }
            <div><button onClick={toggleVisibility} >Cancel</button></div>
          </>
        )
      : <div><button onClick={toggleVisibility} >{buttonLabel}</button></div>
  )
})

Togglable.displayName = Togglable

export default Togglable
