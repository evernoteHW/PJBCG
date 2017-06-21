
const defaultState = {
  isFetching:       false,
  userData: {}
}

const mineFetchResult = (state = defaultState, action) => {
  switch (action.type) {
    case 'MINE_FETCH_POSTS_REQUEST':
      return {
        ...state,
        isFetching: true,
      }
    case 'MINE_FETCH_POSTS_SUCCESS':
      return {
        ...state,
        isFetching: false,
        userData:   action.userData,
      }
    case 'MINE_FETCH_POSTS_FAILURE':
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
