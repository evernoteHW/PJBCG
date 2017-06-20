
const defaultState = {
  isFetching:     false,
  responseData:   [],
  bannerMap:      [],
  mediaReportMap: [],
  recommendMap:   [], 
}

const homeFetchResult = (state = defaultState, action) => {
  switch (action.type) {
    case 'FETCH_POSTS_REQUEST':
      return {
        ...state,
        isFetching: true,
      }
    case 'FETCH_POSTS_SUCCESS':
      return {
        ...state,
        isFetching:     false,
        bannerMap:      action.bannerMap,
        mediaReportMap: action.mediaReportMap,
        recommendMap:   action.recommendMap, 
        responseData:   action.response,
      }
    case 'FETCH_POSTS_FAILURE':
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
