import { NavigationActions } from 'react-navigation';

import  {App} from '../root/navigators'


const firstAction = App.router.getActionForPathAndParams('TabBars');
const tempNavState = App.router.getStateForAction(firstAction);
// const secondAction = AppNavigator.router.getActionForPathAndParams('Mine');
const initialNavState = App.router.getStateForAction(
  tempNavState
);

export default appReducer = (state = initialNavState, action) =>{
  let nextState;
  switch (action.type) {
    case 'Login':
      nextState = App.router.getStateForAction(NavigationActions.navigate({ routeName: 'Login' }),state);
      break;
    case 'Logout':
      nextState = App.router.getStateForAction(NavigationActions.navigate({ routeName: 'Logout' }),state);
      break;
   case 'PushSetting':
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

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}