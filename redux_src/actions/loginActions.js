import * as ActionTypes from  './actionTypes'
import DataRepository from '../common/netWork'

export const requestPosts = () =>{
	return	{
		type: ActionTypes.LOGIN_POST_REQUEST
	}
}
export const receivePosts = (json) =>{
	return {
		type:       ActionTypes.LOGIN_POST_REQUEST_SUCCESS,
		result:     json,
		isFetching: false,
	}
}
export const errorPosts = (error) =>{
	return {
		type:       ActionTypes.LOGIN_POST_REQUEST_FAILURE,
		error:      error,
		isFetching: false,
	}
}
//异步Action
export const userLoginIn = (url,parms)=> dispatch =>{
	return DataRepository.fetchNetRepository(url, parms)
			.then(json => {
				dispatch(receivePosts(json))
			})
			.catch(error => console.log(error))
}