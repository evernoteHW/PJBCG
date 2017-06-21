
const defaultState = {
  isFetching:       false,
  investProductMap: [],
  bannerMap:        [],
}

import * as ActionTypes from '../actions/actionTypes'

const financeFetchResult = (state = defaultState, action) => {
  switch (action.type) {
    case ActionTypes.FINANCE_POST_REQUEST:
      return {
        ...state,
        isFetching: true,
      }
    case ActionTypes.FINANCE_POST_REQUEST_SUCCESS:
      return {
        ...state,
        isFetching:       false,
        investProductMap: action.investProductMap,
      }
    case ActionTypes.FINANCE_POST_REQUEST_FAILURE:
        return {
          ...state,
          error: action.error,
          isFetching: false,
        }
    default:
      return state
  }
}

export default financeFetchResult
