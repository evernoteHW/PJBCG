import { combineReducers } from 'redux'
import homeFetchResult from './home'
import financeFetchResult from './finance'
import mineFetchResult from './mine'
import appReducer from './appReducer'

const todoApp = combineReducers({
	homeFetchResult,
	financeFetchResult,
	mineFetchResult,
	appReducer,
})

export default todoApp