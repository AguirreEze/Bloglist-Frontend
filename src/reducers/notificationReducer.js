export const notificationReducer = (state = { text: '', type: 'ok' }, action) => {
  if (action.type === '@notification/show') {
    return action.payload
  }
  if (action.type === '@notification/hide') {
    return { text: '', type: 'ok' }
  }
  return state
}

export const setNotification = (text, type = 'ok') => {
  return dispatch => {
    dispatch({
      type: '@notification/show',
      payload: {
        text,
        type
      }
    })
    setTimeout(() => {
      dispatch({
        type: '@notification/hide'
      })
    }, 5000)
  }
}
