import { TabBars } from '../root/tarbar'

function getCurrentRoute (state) {
    if (state.routes) {
        return getCurrentRoute(state.routes[state.index]);
    }
    return state;
}

export default tabBarReducer = (state, action) => {
    const newState = TabBars.router.getStateForAction(action, state);
    newState.currentRoute =  getCurrentRoute(newState).routeName;
    return newState;
};
