import { combineReducers } from 'redux'
import homeFetchResult from './home'
import financeFetchResult from './finance'
import mineFetchResult from './mine'
import appReducer from './appReducer'
import modalReducer from './modalReducer'
import tabBarReducer from './tabBarReducer'

const todoApp = combineReducers({
	homeFetchResult,
	financeFetchResult,
	mineFetchResult,
	appReducer,
	modalReducer,
	tabBarReducer,
})

export default todoApp