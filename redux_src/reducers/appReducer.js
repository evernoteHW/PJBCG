import { NavigationActions } from 'react-navigation';

import { App } from '../root/navigators'
import * as ActionTypes from '../actions/actionTypes'

const navState = App.router.getStateForAction(App.router.getActionForPathAndParams('TabBars'));
const initialNavState = App.router.getStateForAction(
  navState
);

export default appReducer = (state = initialNavState, action) =>{
  let nextState;
  switch (action.type) {
   case ActionTypes.PUSH_SETTING:
      nextState = App.router.getStateForAction( NavigationActions.navigate({ 
          routeName: 'Setting',
          params: {
              userData: action.userData 
            }
          })
      ,state );
      break;
    default:
      nextState = App.router.getStateForAction(action, state);
      break;
  }
  return nextState || state;
}