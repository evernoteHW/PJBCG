import DataRepository from '../common/netWork'

export const requestPosts = () =>{
	return	{
		type: 'MINE_FETCH_POSTS_REQUEST'
	}
}
export const receivePosts = json =>{
	return {
		type:      'MINE_FETCH_POSTS_SUCCESS',
        userData: json.result,
		isFetching: false,
	}
}
export const errorPosts = error =>{
	return {
		type:       'MINE_FETCH_POSTS_FAILURE',
		error:      error,
		isFetching: false,
	}
}
export const pushCtrl = userData =>{
	return{
		type: 'PushSetting',
		userData
	}
}
export const updateMineData = (url,parms)=> dispatch =>{

	return DataRepository.fetchNormalNetRepository('rest/userHome/v1.4/homeInit',{})
			.then(json => dispatch(receivePosts(json)))
			.catch(error => dispatch(errorPosts(error)))
}
