import DataRepository from '../common/netWork'

import * as ActionTypes from '../actions/actionTypes'

export const requestPosts = () =>{
	return	{
		type: ActionTypes.MINE_POST_REQUEST
	}
}
export const receivePosts = json =>{
	return {
		type:      ActionTypes.MINE_POST_REQUEST_SUCCESS,
        userData: json.result,
		isFetching: false,
	}
}
export const errorPosts = error =>{
	return {
		type:       ActionTypes.MINE_POST_REQUEST_FAILURE,
		error:      error,
		isFetching: false,
	}
}
export const pushCtrl = userData =>{
	return{
		type: ActionTypes.PUSH_SETTING,
		userData
	}
}
export const updateMineData = (url,parms)=> dispatch =>{

	return DataRepository.fetchNormalNetRepository('rest/userHome/v1.4/homeInit',{})
			.then(json => dispatch(receivePosts(json)))
			.catch(error => dispatch(errorPosts(error)))
}
