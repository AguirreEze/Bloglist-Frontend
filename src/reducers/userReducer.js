export const userReducer = (state = null, action) => {
  if (action.type === '@user/login') {
    return action.payload
  }
  if (action.type === '@user/logout') {
    return null
  }

  return state
}

export const setLogin = (data) => {
  return dispatch => {
    dispatch({
      type: '@user/login',
      payload: data
    })
  }
}

export const setLogout = () => {
  return dispatch => {
    dispatch({
      type: '@user/logout'
    })
  }
}
