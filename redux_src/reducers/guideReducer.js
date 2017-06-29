
const defaultState = {
    gotoRegister: false,
    gotoHome:     false,
    isInstalled:  false,
}

import * as ActionTypes from '../actions/actionTypes'

const guideTouchResponse = (state = defaultState, action) => {
  switch (action.type) {
    case ActionTypes.GUIDE_REGISTER:
      return {
        ...state,
        gotoRegister: true,
      }
    case ActionTypes.FINANCE_POST_REQUEST_SUCCESS:
      return {
        ...state,
        gotoHome: true,
      }
    default:
      return state
  }
}

export default guideTouchResponse
