import React, { useState } from 'react'

const Togglable = ({ children, buttonLabel }, ref) => {
  const [visible, setVisible] = useState(false)

  //   const hideWhenVisible = { display: visible ? '' : 'none' }
  //   const showWhenVisible = { display: visible ? 'none' : '' }
  const toggleVisibility = () => setVisible(!visible)

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
}

export default Togglable
