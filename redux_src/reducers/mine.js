
const defaultState = {
  isFetching:       false,
  userData: {}
}

import * as ActionTypes from '../actions/actionTypes'

const mineFetchResult = (state = defaultState, action) => {
  switch (action.type) {
    case ActionTypes.MINE_POST_REQUEST:
      return {
        ...state,
        isFetching: true,
      }
    case ActionTypes.MINE_POST_REQUEST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        userData:   action.userData,
      }
    case ActionTypes.MINE_POST_REQUEST_FAILURE:
        return {
          ...state,
          error: action.error,
          isFetching: false,
        }
    default:
      return state
  }
}

export default mineFetchResult
