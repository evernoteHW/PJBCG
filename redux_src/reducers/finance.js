
const defaultState = {
  isFetching:       false,
  investProductMap: [],
  bannerMap:        [],
}

const financeFetchResult = (state = defaultState, action) => {
  switch (action.type) {
    case 'FETCH_POSTS_REQUEST1':
      return {
        ...state,
        isFetching: true,
      }
    case 'FETCH_POSTS_SUCCESS1':
      return {
        ...state,
        isFetching:       false,
        investProductMap: action.investProductMap,
      }
    case 'FETCH_POSTS_FAILURE1':
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
