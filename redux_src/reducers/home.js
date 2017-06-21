
const defaultState = {
  isFetching:     false,
  responseData:   [],
  bannerMap:      [],
  mediaReportMap: [],
  recommendMap:   [], 
}

import * as ActionTypes from '../actions/actionTypes'

const homeFetchResult = (state = defaultState, action) => {
  switch (action.type) {
    case ActionTypes.HOME_POST_REQUEST:
      return {
        ...state,
        isFetching: true,
      }
    case ActionTypes.HOME_POST_REQUEST_SUCCESS:
      return {
        ...state,
        isFetching:     false,
        bannerMap:      action.bannerMap,
        mediaReportMap: action.mediaReportMap,
        recommendMap:   action.recommendMap, 
        responseData:   action.response,
      }
    case ActionTypes.HOME_POST_REQUEST_FAILURE:
        return {
          ...state,
          error: action.error,
          isFetching: false,
        }
    default:
      return state
  }
}

export default homeFetchResult
