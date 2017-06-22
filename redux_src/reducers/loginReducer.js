
const defaultState = {
  isFetching:   false,
  loginSuccess: false,
}

import * as ActionTypes from '../actions/actionTypes'

const loginFetchResult = (state = defaultState, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN_POST_REQUEST:
      return {
        ...state,
        isFetching: true,
        loginSuccess: false,
      }
    case ActionTypes.LOGIN_POST_REQUEST_SUCCESS:
      return {
        ...state,
        isFetching:   false,
        result:       action.result,
        loginSuccess: true,
      }
    case ActionTypes.LOGIN_POST_REQUEST_FAILURE:
        return {
          ...state,
          error:        action.error,
          isFetching:   false,
          loginSuccess: false,
        }
    default:
      return state
  }
}

export default loginFetchResult
