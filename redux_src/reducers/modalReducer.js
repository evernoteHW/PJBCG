import { NavigationActions } from 'react-navigation';

import { ModalApp } from '../root/modalApp'


const firstAction = ModalApp.router.getActionForPathAndParams('MainCardNavigator');
const tempNavState = ModalApp.router.getStateForAction(firstAction);
// const secondAction = AppNavigator.router.getActionForPathAndParams('Mine');
const initialNavState = ModalApp.router.getStateForAction(
  tempNavState
);

export default modalReducer = (state = initialNavState, action) =>{
  let nextState;
  switch (action.type) {
    case 'Login':
      nextState = ModalApp.router.getStateForAction(NavigationActions.navigate({ routeName: 'Login' }),state);
      break;
    case 'Logout':
      nextState = ModalApp.router.getStateForAction(NavigationActions.navigate({ routeName: 'Logout' }),state);
      break;
    default:
      nextState = ModalApp.router.getStateForAction(action, state);
      break;
  }

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}