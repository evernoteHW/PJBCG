import { combineReducers } from 'redux'
import homeFetchResult from './home'
const todoApp = combineReducers({
	homeFetchResult,
})

export default todoApp